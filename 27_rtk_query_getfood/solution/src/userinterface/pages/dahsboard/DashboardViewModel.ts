import { useDispatch } from "@foodsapp/store";
import { useEffect } from "react";

import { FoodsPresenter } from "@foodsapp/adapters/presenters/foods.presenters";
import { apiFoods, getFoodsUseCase } from "@foodsapp/usecases/foods.usecase";

export function DashboardViewModel() {
  const dispatch = useDispatch();
  const { data: foods, isLoading } = FoodsPresenter();

  useEffect(() => {
    console.log("DashboardViewModel useEffect", apiFoods);
    dispatch(getFoodsUseCase());
  }, [dispatch]);
  return {
    foods,
    isLoading,
  };
}
