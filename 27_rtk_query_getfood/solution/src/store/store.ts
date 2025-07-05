import { apiFood, foodReducer } from "@foodsapp/usecases/food.usecase.ts";
import { apiFoods, foodsReducer } from "@foodsapp/usecases/foods.usecase.ts";
import { configureStore } from "@reduxjs/toolkit";
import { EqualityFn, useDispatch as useDispatchBasic } from "react-redux";
import { useSelector as useSelectorBasic } from "react-redux";

export const reducer = {
  food: foodReducer,
  foods: foodsReducer,
  [apiFoods.reducerPath]: apiFoods.reducer,
  [apiFood.reducerPath]: apiFood.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiFoods.middleware)
      .concat(apiFood.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export const useDispatch = () => useDispatchBasic<AppDispatch>();

export const useSelector = <T = unknown>(
  selector: (state: RootState) => T,
  equalityFn?: EqualityFn<T> | undefined
): T => useSelectorBasic<RootState, T>(selector, equalityFn);
