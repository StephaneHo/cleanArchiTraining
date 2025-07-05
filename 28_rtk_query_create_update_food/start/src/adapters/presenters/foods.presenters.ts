import { useSelector } from "@foodsapp/store";
import { selectFoods } from "@foodsapp/usecases/foods.usecase";

export const FoodsPresenter = () => {
  const { data, isLoading } = useSelector(selectFoods);
  return {
    data,
    isLoading,
  };
};
