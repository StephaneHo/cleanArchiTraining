import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Food, FoodState } from "@foodsapp/models/food.interface";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@foodsapp/store";
import { FoodsRepository } from "@foodsapp/adapters/repositories/foods.repository";

const initialState: FoodState = {
  data: {},
  isLoading: false,
  errors: {
    createFoodUseCaseErrorMessage: "",
    updateFoodUseCaseErrorMessage: "",
    getFoodUseCaseErrorMessage: "",
  },
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    resetFoodUseCase: (state) => {
      state.data = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(createFoodUseCase.fulfilled, (state) => {
      state.errors.createFoodUseCaseErrorMessage = "";
    });
    builder.addCase(createFoodUseCase.rejected, (state, action) => {
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
    builder.addCase(updateFoodUseCase.fulfilled, (state, action) => {
      state.data = action.payload;
      state.errors.updateFoodUseCaseErrorMessage = "";
    });
    builder.addCase(updateFoodUseCase.rejected, (state, action) => {
      state.errors.updateFoodUseCaseErrorMessage =
        action.error.message ?? "unknown error";
    });
  },
});

export const createFoodUseCase = createAsyncThunk<
  boolean,
  { food: Partial<Food> },
  { rejectValue: Error }
>("foods/createFood", async ({ food }, { rejectWithValue }) => {
  try {
    const { data } = await FoodsRepository().createFood(food);
    return data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error);
  }
});

// DO NOT FORGET THE RETURN BEFORE the rejectWithValue
export const getFoodUseCase = createAsyncThunk<
  Food,
  { foodId: string },
  { rejectValue: Error }
>("foods/getFood", async ({ foodId }, { rejectWithValue }) => {
  try {
    const { data: food } = await FoodsRepository().getFood(foodId);
    return food;
  } catch (e) {
    const error = e as Error;
    console.error("Erreur lors du food use case: " + error.message);
    return rejectWithValue(error);
  }
});

//note: example in
//  https://redux-toolkit.js.org/api/createAsyncThunk
//  Note: this is a contrived example assuming our userAPI only ever throws validation-specific errors

// type AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig extends AsyncThunkConfig> = MaybePromise<IsUnknown<GetFulfilledMeta<ThunkApiConfig>, Returned, FulfillWithMeta<Returned, GetFulfilledMeta<ThunkApiConfig>>> | RejectWithValue<GetRejectValue<ThunkApiConfig>, GetRejectedMeta<ThunkApiConfig>>>;
export const updateFoodUseCase = createAsyncThunk<
  Partial<Food>,
  { foodToUpdate: Partial<Food>; isSavedOnServer?: boolean },
  { rejectValue: Error; getState: RootState }
>(
  "foods/updateFood",
  async ({ foodToUpdate, isSavedOnServer }, { rejectWithValue, getState }) => {
    try {
      const state = (getState() as RootState).food.data;
      const updatedFood = { ...state, ...foodToUpdate };
      if (isSavedOnServer) {
        await FoodsRepository().updateFood(updatedFood);
      }
      return updatedFood;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error);
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
export const { resetFoodUseCase } = foodSlice.actions;
