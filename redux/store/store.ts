import { configureStore } from "@reduxjs/toolkit";
import { UseDispatch } from "react-redux";

//reducers
import dummySlice from "../slices/dummySlice";
export const store = configureStore({
  reducer: {
    dummy: dummySlice,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
