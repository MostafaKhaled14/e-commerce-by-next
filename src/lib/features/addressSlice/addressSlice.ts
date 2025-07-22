import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AddressProps } from "../userSlice/userSlice";
import { toast } from "react-toastify";

export const addAddressThunk = createAsyncThunk(
  "address/addAddressThunk",
  async (
    {
      values,
      token,
    }: {
      values: { name: string; details: string; phone: string; city: string };
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/addresses", values, { headers: { token: token || "" } });
      return data;
    } catch (err) {
      const error = err as AxiosError<{ errors: { msg: string }; message: string }>;
      if (error?.response?.data?.message === "User recently changed password! Please login again.") {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      } else if (error?.response?.data?.errors?.msg === "") {
        return thunkAPI.rejectWithValue(error?.response?.data?.errors?.msg);
      } else {
        return thunkAPI.rejectWithValue("Failed to add address");
      }
    }
  }
);

export const deleteAddressThunk = createAsyncThunk(
  "address/deleteAddressThunk",
  async ({ addressId, token }: { addressId: string; token: string }, thunkAPI) => {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, { headers: { token: token || "" } });
      return data;
    } catch (err) {
      const error = err as AxiosError<{ errors: { msg: string }; message: string }>;
      if (error?.response?.data?.message === "User recently changed password! Please login again.") {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      } else if (error?.response?.data?.errors?.msg === "") {
        return thunkAPI.rejectWithValue(error?.response?.data?.errors?.msg);
      } else {
        return thunkAPI.rejectWithValue("Failed to delete address");
      }
    }
  }
);

type AuthState = {
  userAddresses: AddressProps[] | [];
  isLoadingFromAdresse: boolean;
  addressIsAdded: boolean;
  errorMessage: string | null;
};

const initialState: AuthState = {
  userAddresses: [],
  isLoadingFromAdresse: false,
  addressIsAdded: false,
  errorMessage: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetChangesFromAddressSlice: (state) => {
      state.addressIsAdded = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddressThunk.pending, (state) => {
        state.isLoadingFromAdresse = true;
        state.addressIsAdded = false;
      })
      .addCase(addAddressThunk.fulfilled, (state, action) => {
        state.isLoadingFromAdresse = false;
        state.userAddresses = action.payload.data;
        state.addressIsAdded = true;
        toast.success("Address added successfully");
      })
      .addCase(addAddressThunk.rejected, (state, action) => {
        state.isLoadingFromAdresse = false;
        state.addressIsAdded = false;
        state.errorMessage = action.payload as string;
      });
    builder
      .addCase(deleteAddressThunk.pending, (state) => {
        state.isLoadingFromAdresse = true;
      })
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.isLoadingFromAdresse = false;
        state.userAddresses = action.payload.data;
        toast.success("Address removed successfully");
      })
      .addCase(deleteAddressThunk.rejected, (state, action) => {
        state.isLoadingFromAdresse = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetChangesFromAddressSlice } = addressSlice.actions;
export default addressSlice.reducer;
