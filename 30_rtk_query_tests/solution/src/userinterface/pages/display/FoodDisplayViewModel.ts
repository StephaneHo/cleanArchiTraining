import { useDispatch } from "@foodsapp/store";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { FoodPresenter } from "@foodsapp/adapters/presenters/food.presenter";
import { getFoodUseCase } from "@foodsapp/usecases/food.usecase";

export function FoodDisplayViewModel() {
  const dispatch = useDispatch();
  const { foodId } = useParams() as { foodId: string };

  const { data: food, isLoading } = FoodPresenter({ foodId });

  useEffect(() => {
    if (foodId) {
      dispatch(getFoodUseCase({ foodId }));
    }
  }, [dispatch]);
  return {
    food,
    isLoading,
  };
}
