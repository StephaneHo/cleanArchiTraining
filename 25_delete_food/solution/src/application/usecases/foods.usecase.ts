import { FoodsState } from "@foodsapp/models/foods.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { FoodsRepository } from "@foodsapp/adapters/repositories/foods.repository";
import { RootState } from "@foodsapp/store";
import { Food } from "@foodsapp/models/food.interface";

const initialState: FoodsState = {
  data: [], // array of foods
  isLoading: false,
  errors: {
    getFoodsUseCaseErrorMessage: "",
    deleteFoodUseCaseErrorMessage: "",
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
    builder.addCase(deleteFoodUseCase.fulfilled, (state, action) => {
      state.data = action.payload;
      state.errors.getFoodsUseCaseErrorMessage = "";
    });
    builder.addCase(deleteFoodUseCase.rejected, (state, action) => {
      state.errors.deleteFoodUseCaseErrorMessage =
        action.error.message ?? "unknown error";
    });
  },
});

export const foodsReducer = foodsSlice.reducer;

export const getFoodsUseCase = createAsyncThunk(
  "foods/getFoods",
  async (_, { rejectWithValue }) => {
    try {
      const { data: foods, error } = await FoodsRepository().getFoods();
      return foods;
    } catch (e) {
      const error = e as Error;
      rejectWithValue(error);
    }
  },
  {
    condition: (_: void, { getState }: { getState: RootState }) => {
      const { isLoading } = getState().foods;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const deleteFoodUseCase = createAsyncThunk<
  Food[],
  { foodId: string },
  { rejectValue: Error; getState: RootState }
>("foods/deleteFood", async ({ foodId }, { rejectWithValue, getState }) => {
  try {
    const foodsBeforeDeletion = (getState() as RootState).foods.data;
    await FoodsRepository().deleteFood(foodId);
    return foodsBeforeDeletion.filter((food) => food.id !== foodId);
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error);
  }
});

const selectFoodsState = (state: { foods: FoodsState }) => state.foods;

export const selectFoods = createSelector(selectFoodsState, ({ data }) => data);

export const selectIsLoadingFoods = createSelector(
  selectFoodsState,
  ({ isLoading }) => isLoading
);
