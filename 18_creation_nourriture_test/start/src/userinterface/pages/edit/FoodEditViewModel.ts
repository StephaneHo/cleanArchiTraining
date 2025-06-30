import { Food } from "@foodsapp/models/food.interface";
import { useDispatch } from "@foodsapp/store";
import { createFoodUseCase } from "@foodsapp/usecases/food.usecase";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function FoodEditViewModel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [food, setFood] = useState<Food>({} as Food);

  const onChangeTitle = (title: string) => {
    console.log("Call to change title", title);
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
    onChangeTitle,
    onSubmit,
  };
}
