import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {},
  reducers: {},
  extraReducers() {},
});

export const foodReducer = foodSlice.reducer;
