import { Food } from "@foodsapp/models/food.interface";
import { createSelector, isAnyOf } from "@reduxjs/toolkit";
import { FoodsRepository } from "@foodsapp/adapters/repositories/foods.repository";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { apiFoods } from "./foods.usecase";
import { AppStartListening } from "@foodsapp/store";

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
    createFoodUseCase: builder.mutation<boolean, { food: Partial<Food> }>({
      queryFn: async ({ food }) => {
        const { data, error } = await FoodsRepository().createFood(food);

        if (error) {
          console.error("Error during creating food use case:", error);
        }
        return { data };
      },
    }),
    updateFoodUseCase: builder.mutation<
      Partial<Food>,
      { foodToUpdate: Partial<Food> }
    >({
      queryFn: async ({ foodToUpdate }) => {
        const { data, error } = await FoodsRepository().updateFood(
          foodToUpdate
        );

        if (error) {
          console.error("Error during updating food use case:", error);
        }
        return { data };
      },
    }),
  }),
});

export const getFoodUseCase = ({ foodId }: { foodId: string }) =>
  apiFood.endpoints.getFoodUseCase.initiate({ foodId });

export const createFoodUseCase = ({ food }: { food: Partial<Food> }) =>
  apiFood.endpoints.createFoodUseCase.initiate({ food });

export const updateFoodUseCase = ({
  foodToUpdate,
}: {
  foodToUpdate: Partial<Food>;
}) => apiFood.endpoints.updateFoodUseCase.initiate({ foodToUpdate });

export const selectFood = createSelector(
  (foodId: string) => foodId,
  (foodId) => apiFood.endpoints.getFoodUseCase.select({ foodId })
);

export const foodListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(
      apiFood.endpoints?.updateFoodUseCase.matchFulfilled,
      apiFood.endpoints?.createFoodUseCase.matchFulfilled
    ),
    effect: async (_, listenerApi) => {
      listenerApi.dispatch(apiFoods.util.invalidateTags(["Foods"]));
    },
  });
};
