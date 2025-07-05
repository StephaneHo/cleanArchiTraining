import { FoodsState } from "@foodsapp/models/foods.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { FoodsRepository } from "@foodsapp/adapters/repositories/foods.repository";
import { RootState } from "@foodsapp/store";
import { Food } from "@foodsapp/models/food.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

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

export const apiFoods = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/http://localhost:3000" }),
  tagTypes: ["Foods"],
  endpoints: (builder) => ({
    getFoodsUseCase: builder.query<Food[], void>({
      queryFn: async () => {
        const { data, error } = await FoodsRepository().getFoods();

        if (error) {
          console.error("Error fetching foods:", error);
        }
        return { data };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Foods" as const, id }))]
          : [],
    }),
  }),
});

export const getFoodsUseCase = () =>
  apiFoods.endpoints.getFoodsUseCase.initiate();

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

const res = (state: RootState) =>
  apiFoods.endpoints.getFoodsUseCase.select()(state);
console.log(res(1));

export const selectFoods = createSelector(
  (state: RootState) => state,
  (state) => apiFoods.endpoints.getFoodsUseCase.select()(state)
);

export const foodsReducer = foodsSlice.reducer;
