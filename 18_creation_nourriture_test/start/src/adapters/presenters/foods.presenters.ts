import { useSelector } from "@foodsapp/store";
import {
  selectFoods,
  selectIsLoadingFoods,
} from "@foodsapp/usecases/foods.usecase";

export const FoodsPresenter = () => {
  const data = useSelector(selectFoods);
  const isLoading = useSelector(selectIsLoadingFoods);
  return {
    data,
    isLoading,
  };
};
