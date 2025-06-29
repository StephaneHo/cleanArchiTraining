import { FoodsState } from "@foodsapp/models/foods.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { FoodsRespository } from "@foodsapp/adapters/repositories/foods.repository";
import { RootState } from "@foodsapp/store";

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

export const getFoodsUseCase = createAsyncThunk(
  "foods/getFoods",
  async (_, { rejectWithValue }) => {
    try {
      const { data: foods, error } = await FoodsRespository().getFoods();
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

const selectFoodsState = (state: { foods: FoodsState }) => state.foods;

export const selectFoods = createSelector(selectFoodsState, ({ data }) => data);

export const selectIsLoadingFoods = createSelector(
  selectFoodsState,
  ({ isLoading }) => isLoading
);
