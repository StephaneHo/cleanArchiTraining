import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Food, FoodState } from "@foodsapp/models/food.interface";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@foodsapp/store";
import { FoodsRepository } from "@foodsapp/adapters/repositories/foods.repository";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

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

export const apiFood = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/http://localhost:3000" }),
  tagTypes: ["Food"],
  endpoints: (builder) => ({
    getFoodUseCase: builder.query<Food, { foodId: string }>({
      queryFn: async ({ foodId }) => {
        const { data, error } = await FoodsRepository().getFood(foodId);

        if (error) {
          console.error("Error fetching food:", error);
        }
        return { data };
      },
      providesTags: (result) => [{ id: result?.id, type: "Food" as const }],
    }),
  }),
});

export const getFoodUseCase = ({ foodId }: { foodId: string }) =>
  apiFood.endpoints.getFoodUseCase.initiate({ foodId });

export const selectFood = createSelector(
  (foodId: string) => foodId,
  (foodId) => apiFood.endpoints.getFoodUseCase.select({ foodId })
);

//note: example in
//  https://redux-toolkit.js.org/api/createAsyncThunk
//  Note: this is a contrived example assuming our userAPI only ever throws validation-specific errors

// type AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig extends AsyncThunkConfig> = MaybePromise<IsUnknown<GetFulfilledMeta<ThunkApiConfig>, Returned, FulfillWithMeta<Returned, GetFulfilledMeta<ThunkApiConfig>>> | RejectWithValue<GetRejectValue<ThunkApiConfig>, GetRejectedMeta<ThunkApiConfig>>>;
export const updateFoodUseCase = createAsyncThunk<
  Partial<Food>,
  { foodToUpdate: Partial<Food>; isSavedOnServer?: boolean },
  { rejectValue: Error; state: RootState }
>(
  "foods/updateFood",
  async ({ foodToUpdate, isSavedOnServer }, { rejectWithValue, getState }) => {
    try {
      const state = getState().food.data;
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

export const foodReducer = foodSlice.reducer;
export const { resetFoodUseCase } = foodSlice.actions;
