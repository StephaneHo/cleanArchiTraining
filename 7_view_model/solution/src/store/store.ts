import { foodReducer } from "@foodsapp/application/usecases/food.usecase";
import { foodsReducer } from "@foodsapp/application/usecases/foods.usecase";
import { configureStore } from "@reduxjs/toolkit";
import { EqualityFn, useDispatch as useDispatchBasic } from "react-redux";
import { useSelector as useSelectorBasic } from "react-redux";

export const reducer = {
  food: foodReducer,
  foods: foodsReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = any;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export const useDispatch = () => useDispatchBasic<AppDispatch>();

export const useSelector = <T = unknown>(
  selector: (state: RootState) => T,
  equalityFn?: EqualityFn<T> | undefined
): T => useSelectorBasic<RootState, T>(selector, equalityFn);
