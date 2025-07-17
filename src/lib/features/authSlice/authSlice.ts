import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const loginThunk = createAsyncThunk("auth/login", async (values: { email: string; password: string }, thunkAPI) => {
  try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const signupThunk = createAsyncThunk(
  "auth/signup",
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
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

type AuthState = {
  token: string | null;
  user: {
    name: string;
    email: string;
  } | null;
  loading: boolean;
  loginMessage: string | null;
  signupMessage: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  loginMessage: null,
  signupMessage: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.loginMessage = null;
      state.signupMessage = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
        state.loginMessage = action.payload.message || null;
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.loginMessage = action.payload as string;
      });
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.signupMessage = action.payload.message || null;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.signupMessage = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
