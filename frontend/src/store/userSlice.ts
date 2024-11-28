import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "" },
  reducers: {
    setName: (state) => {
      state.name = "berlin";
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice;
