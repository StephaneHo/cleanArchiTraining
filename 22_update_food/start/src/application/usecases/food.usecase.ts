import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FoodsRespository } from "@foodsapp/adapters/repositories/foods.repository";
import { Food, FoodState } from "@foodsapp/models/food.interface";
import { createSelector } from "@reduxjs/toolkit";
const initialState: FoodState = {
  data: {},
  isLoading: false,
  errors: {
    createFoodUseCaseErrorMessage: "",
    getFoodUseCaseErrorMessage: "",
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
    builder.addCase(getFoodUseCase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFoodUseCase.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.errors.getFoodUseCaseErrorMessage = "";
    });
    builder.addCase(getFoodUseCase.rejected, (state, action) => {
      state.isLoading = false;
      state.errors.getFoodUseCaseErrorMessage =
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
export const getFoodUseCase = createAsyncThunk(
  "foods/getFood",
  async ({ foodId }: { foodId: string }, { rejectWithValue }) => {
    try {
      const { data: food } = await FoodsRespository().getFood(foodId);
      return food;
    } catch (e) {
      const error = e as Error;
      rejectWithValue(error);
    }
  }
);

const selectFoodState = (state: { food: FoodState }) => state.food;

export const selectFood = createSelector(selectFoodState, ({ data }) => data);

export const selectIsLoadingFood = createSelector(
  selectFoodState,
  ({ isLoading }) => isLoading
);

export const foodReducer = foodSlice.reducer;
