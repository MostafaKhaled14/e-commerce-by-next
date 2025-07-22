import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../lib/features/authSlice/authSlice";
import userReducer from "../lib/features/userSlice/userSlice";
import addressReducer from "../lib/features/addressSlice/addressSlice";
import forgotReducer from "../lib/features/authSlice/newPassowrdSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    address: addressReducer,
    forgot: forgotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
