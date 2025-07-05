import { createSelector } from "@reduxjs/toolkit";
import { FoodsRepository } from "@foodsapp/adapters/repositories/foods.repository";
import { RootState } from "@foodsapp/store";
import { Food } from "@foodsapp/models/food.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

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
    deleteFoodsUseCase: builder.mutation<boolean, { foodId: string }>({
      queryFn: async ({ foodId }) => {
        const { data, error } = await FoodsRepository().deleteFood(foodId);

        if (error) {
          console.error("Error deletgin food:", error);
        }
        return { data };
      },
      onQueryStarted: async ({ foodId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiFoods.util.updateQueryData(
            "getFoodsUseCase",
            undefined,
            (draft) => {
              const indexToRemove = draft.findIndex(
                (food) => food.id === foodId
              );
              draft.splice(indexToRemove, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const getFoodsUseCase = () =>
  apiFoods.endpoints.getFoodsUseCase.initiate();

export const selectFoods = createSelector(
  (state: RootState) => state,
  (state) => apiFoods.endpoints.getFoodsUseCase.select()(state)
);

export const deleteFoodUseCase = ({ foodId }: { foodId: string }) =>
  apiFoods.endpoints.deleteFoodsUseCase.initiate({ foodId });
