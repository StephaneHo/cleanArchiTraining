import { apiFood, foodListener } from "@foodsapp/usecases/food.usecase.ts";
import { apiFoods } from "@foodsapp/usecases/foods.usecase.ts";
import {
  configureStore,
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { EqualityFn, useDispatch as useDispatchBasic } from "react-redux";
import { useSelector as useSelectorBasic } from "react-redux";

const listenerMiddleware = createListenerMiddleware();

export const reducer = {
  [apiFoods.reducerPath]: apiFoods.reducer,
  [apiFood.reducerPath]: apiFood.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
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

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

foodListener(listenerMiddleware.startListening as AppStartListening);
