import { createSlice } from "@reduxjs/toolkit";

const foodsSlice = createSlice({
  name: "foods",
  initialState: {},
  reducers: {},
  extraReducers() {},
});

export const foodsReducer = foodsSlice.reducer;
