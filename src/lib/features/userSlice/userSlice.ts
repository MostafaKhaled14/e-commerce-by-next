import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const verifyTokenThunk = createAsyncThunk("user/verifyTokenThunk", async (token: string, thunkAPI) => {
  if (!token) return thunkAPI.rejectWithValue("No token found");
  try {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
      headers: { token: token || "" },
    });
    const userId = response.data.decoded.id;
    return { userId };
  } catch {
    return thunkAPI.rejectWithValue('Invalid or expired token. "Please login again"');
  }
});

export const fetchUserDataThunk = createAsyncThunk("user/fetchUserDataThunk", async ({ userId }: { userId: string }, thunkAPI) => {
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
      const error = err as AxiosError<{ errors: { msg: string }; message: string }>;
      if (error?.response?.data?.message === "User recently changed password! Please login again.") {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      } else if (error?.response?.data?.errors?.msg === "Incorrect current password") {
        return thunkAPI.rejectWithValue(error?.response?.data?.errors?.msg);
      } else {
        return thunkAPI.rejectWithValue("Failed to change password");
      }
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "user/updateProfileThunk",
  async (values: { name: string; email: string; phone: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", values, {
        headers: { token },
      });
      return data;
    } catch (err) {
      const error = err as AxiosError<{ errors: { msg: string }; message: string }>;
      if (error?.response?.data?.message === "User recently changed password! Please login again.") {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      } else if (error?.response?.data?.errors?.msg === "E-mail already in use") {
        return thunkAPI.rejectWithValue(error?.response?.data?.errors?.msg);
      } else {
        return thunkAPI.rejectWithValue("Failed to edit profile");
      }
    }
  }
);

export type AddressProps = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

type AuthState = {
  errorMessage: string | null;
  passwordIsChanged: boolean;
  profileIsUpdated: boolean;
  loading: boolean;
  userData: {
    name: string;
    email: string;
    phone: string;
    addresses: AddressProps[] | [];
  } | null;
};

const initialState: AuthState = {
  loading: false,
  passwordIsChanged: false,
  profileIsUpdated: false,
  errorMessage: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetChanges: (state) => {
      state.passwordIsChanged = false;
      state.profileIsUpdated = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyTokenThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyTokenThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyTokenThunk.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(fetchUserDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
      })
      .addCase(fetchUserDataThunk.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        toast.success("Password changed successfully");
        state.passwordIsChanged = true;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.passwordIsChanged = false;
      });
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        toast.success("Profile updated successfully");
        state.profileIsUpdated = true;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.profileIsUpdated = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetChanges } = userSlice.actions;
export default userSlice.reducer;
