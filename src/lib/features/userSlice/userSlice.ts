import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const verifyToken = createAsyncThunk("user/verifyToken", async (token: string, thunkAPI) => {
  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
      headers: { token: token || "" },
    });
    if (response.data.message === "verified") {
      const userId = response.data.decoded.id;
      return { userId };
    } else {
      throw new Error("Invalid token");
    }
  } catch {
    return thunkAPI.rejectWithValue('Invalid or expired token. "Please login again"');
  }
});

export const fetchUserData = createAsyncThunk("user/fetchUserData", async ({ userId }: { userId: string }, thunkAPI) => {
  try {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${userId}`);
    return data;
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch user data. "Please login again"');
  }
});

export const changePasswordThunk = createAsyncThunk(
  "user/changePasswordThunk",
  async (
    {
      values,
      token,
    }: {
      values: { currentPassword: string; password: string; rePassword: string };
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
        headers: { token: token || "" },
      });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message === "fail") {
        const error = err as AxiosError<{ errors: { msg: string } }>;
        return thunkAPI.rejectWithValue(error.response?.data?.errors?.msg || "Something went wrong");
      } else {
        const error = err as AxiosError<{ message: string }>;
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  }
);

type AuthState = {
  error: string | null;
  passwordIsChanged: boolean;
  successMessage?: string | null;
  loading: boolean;
  userData: {
    name: string;
    email: string;
    phone: string;
    addresses: string[];
  } | null;
};

const initialState: AuthState = {
  error: null,
  passwordIsChanged: false,
  successMessage: null,
  loading: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.passwordIsChanged = false;
      state.successMessage = null;
      state.loading = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.passwordIsChanged = false;
        state.successMessage = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Password changed successfully";
        if (action.payload.message === "success") {
          state.passwordIsChanged = true;
        }
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.passwordIsChanged = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
