import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FoodsRespository } from "@foodsapp/adapters/repositories/foods.repository";
import { Food, FoodState } from "@foodsapp/models/food.interface";

const initialState: FoodState = {
  data: {},
  isLoading: false,
  errors: {
    createFoodUseCaseErrorMessage: "",
  },
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createFoodUseCase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createFoodUseCase.fulfilled, (state) => {
      state.isLoading = false;
      state.errors.createFoodUseCaseErrorMessage = "";
    });
    builder.addCase(createFoodUseCase.rejected, (state, action) => {
      state.isLoading = false;
      state.errors.createFoodUseCaseErrorMessage =
        action.error.message ?? "unknown error";
    });
  },
});

export const createFoodUseCase = createAsyncThunk(
  "foods/createFood",
  async ({ food }: { food: Partial<Food> }, { rejectWithValue }) => {
    try {
      await FoodsRespository().createFood(food);
      return true;
    } catch (e) {
      const error = e as Error;
      rejectWithValue(error);
    }
  }
);

export const foodReducer = foodSlice.reducer;
