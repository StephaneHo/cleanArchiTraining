import { useSelector } from "@foodsapp/store";
import { selectFood } from "@foodsapp/usecases/food.usecase";

export const FoodPresenter = ({ foodId }: { foodId: string }) => {
  const { data, isLoading } = useSelector(selectFood(foodId));
  return {
    data,
    isLoading,
  };
};
