import { Food } from "@foodsapp/models/food.interface";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "@foodsapp/store";
import { createFoodUseCase } from "@foodsapp/usecases/food.usecase";
import { useNavigate } from "react-router-dom";
export const MIN_LENGTH_TITLE = 10;
export const MAX_LENGTH_TITLE = 50;

export function FoodEditViewModel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [food, setFood] = useState<Food>({} as Food);
  console.log("in edit view model", food);

  const onChangeTitle = (title: string) => {
    setFood((prev) => ({ ...prev, title }));
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createFoodUseCase({ food }));
    if (res?.meta?.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };
  return {
    onSubmit,
    MIN_LENGTH_TITLE,
    MAX_LENGTH_TITLE,
    onChangeTitle,
  };
}
