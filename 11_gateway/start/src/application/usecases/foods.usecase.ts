import { foodFakeData } from "@foodsapp/infrastructure/inMemory/database/food.db";
import { FoodsState } from "@foodsapp/models/foods.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState: FoodsState = {
  data: [], // array of foods
  isLoading: false,
  errors: {
    getFoodsUseCaseErrorMessage: "",
  },
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFoodsUseCase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFoodsUseCase.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFoodsUseCase.rejected, (state, action) => {
      state.isLoading = false;
      state.errors.getFoodsUseCaseErrorMessage =
        action.error.message ?? "unknown error";
    });
  },
});

export const foodsReducer = foodsSlice.reducer;

export const getFoodsUseCase = createAsyncThunk("foods/getFoods", async () => {
  return foodFakeData;
});

const selectFoodsState = (state: { foods: FoodsState }) => state.foods;

export const selectFoods = createSelector(selectFoodsState, ({ data }) => data);

export const selectIsLoadingFoods = createSelector(
  selectFoodsState,
  ({ isLoading }) => isLoading
);
