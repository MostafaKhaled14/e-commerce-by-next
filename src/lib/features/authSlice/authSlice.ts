import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const loginThunk = createAsyncThunk("auth/loginThunk", async (values: { email: string; password: string }, thunkAPI) => {
  try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ errors: { msg: string }; message: string }>;
    if (error?.response?.data?.message === "Incorrect email or password") {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    } else {
      return thunkAPI.rejectWithValue("Failed to login");
    }
  }
});

export const signupThunk = createAsyncThunk(
  "auth/signupThunk",
  async (
    values: {
      name: string;
      email: string;
      password: string;
      rePassword: string;
      phone: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      return data;
    } catch (err) {
      const error = err as AxiosError<{ errors: { msg: string }; message: string }>;
      if (error?.response?.data?.message === "Account Already Exists") {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      } else {
        return thunkAPI.rejectWithValue("Failed to signup");
      }
    }
  }
);

type AuthState = {
  loading: boolean;
  errorMessage: string | null;
  isLoggedIn: boolean;
  isRegested: boolean;
};

const initialState: AuthState = {
  loading: false,
  errorMessage: null,
  isLoggedIn: false,
  isRegested: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.isRegested = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        toast.success("Welcome");
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.isRegested = false;
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.loading = false;
        state.isRegested = true;
        toast.success("Account added successfully");
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.isRegested = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
