import { FoodsState } from "@foodsapp/models/foods.interface";
import { FoodsGateway } from "../../infrastructure/gateways/foods.gateway";
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

export const getFoodsUseCase = createAsyncThunk(
  "foods/getFoods",
  async (_, { rejectWithValue }) => {
    try {
      const foodsGateway = FoodsGateway.getInstance();
      // note: on n a pas mis de generique sur le singleton car le typage en TS n est pas vraiment fait pour les variables statiques
      return await (foodsGateway as FoodsGateway).getFoods();
    } catch (e) {
      const error = e as Error;
      rejectWithValue(error);
    }
  }
);

const selectFoodsState = (state: { foods: FoodsState }) => state.foods;

export const selectFoods = createSelector(selectFoodsState, ({ data }) => data);

export const selectIsLoadingFoods = createSelector(
  selectFoodsState,
  ({ isLoading }) => isLoading
);
