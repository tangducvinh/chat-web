import userSlice from "./userSlice";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
    },
  });

export const wrapper = createWrapper(makeStore);
