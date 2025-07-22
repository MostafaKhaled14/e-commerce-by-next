import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const forgotPasswordThunk = createAsyncThunk("forgot/forgotPasswordThunk", async (values: { email: string }, thunkAPI) => {
  try {
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
  } catch (err) {
    const error = err as AxiosError<{ statusMsg: string; message: string }>;
    if (error?.response?.data?.statusMsg === "fail") {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    } else {
      return thunkAPI.rejectWithValue("Failed to send verify code");
    }
  }
});

export const verifyCodeThunk = createAsyncThunk("forgot/verifyCodeThunk", async (values: { resetCode: string }, thunkAPI) => {
  try {
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
  } catch (err) {
    const error = err as AxiosError<{ statusMsg: string; message: string }>;
    if (error?.response?.data?.message === "Reset code is invalid or has expired") {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    } else {
      return thunkAPI.rejectWithValue("Failed to get verify code");
    }
  }
});

export const resetPasswordThunk = createAsyncThunk("forgot/resetPasswordThunk", async (values: { email: string; newPassword: string }, thunkAPI) => {
  try {
    await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);
  } catch (err) {
    const error = err as AxiosError<{ statusMsg: string; message: string }>;
    if (error?.response?.data?.statusMsg === "fail") {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    } else {
      return thunkAPI.rejectWithValue("Failed to send verify code");
    }
  }
});

type ForgotState = {
  loading: boolean;
  passwordIsChenged: boolean;
  errorMessage: string | null;
};

const initialState: ForgotState = {
  loading: false,
  passwordIsChenged: false,
  errorMessage: null,
};

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    checkedIn: (state) => {
      state.loading = false;
      state.errorMessage = null;
      state.passwordIsChenged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        toast.success("Check your email for a verification code.");
        state.loading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(verifyCodeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCodeThunk.fulfilled, (state) => {
        toast.success("Email verification successful");
        state.loading = false;
      })
      .addCase(verifyCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        toast.success("Password Changed Successful");
        state.loading = false;
        state.passwordIsChenged = true;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { checkedIn } = forgotSlice.actions;
export default forgotSlice.reducer;
