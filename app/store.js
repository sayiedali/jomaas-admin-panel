
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./_slices/userSlice";

export const store = configureStore({
  reducer: {
    userData: userSlice,
  },
});