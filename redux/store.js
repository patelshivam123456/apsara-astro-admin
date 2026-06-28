import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import astrologerReducer from "./astrologers/astrologerSlice";
import uiReducer from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    astrologers: astrologerReducer,
    ui: uiReducer
  }
});
