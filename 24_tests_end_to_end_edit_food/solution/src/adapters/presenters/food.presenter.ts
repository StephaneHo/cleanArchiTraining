import { useSelector } from "@foodsapp/store";
import {
  selectFood,
  selectIsLoadingFood,
} from "@foodsapp/usecases/food.usecase";

export const FoodPresenter = () => {
  const data = useSelector(selectFood);
  const isLoading = useSelector(selectIsLoadingFood);
  return {
    data,
    isLoading,
  };
};
