import { FoodEntity } from "@foodsapp/domain/entities/food.entity";
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

  const checkValidFood = (food: Food) => {
    const foodEntity = new FoodEntity();
    return foodEntity.isValidTitle(food.title);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkValidFood(food)) {
      console.error("Title is invalid");
      return;
    }
    const res = await dispatch(createFoodUseCase({ food }));
    if (res?.meta?.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return {
    onChangeTitle,
    onSubmit,
    checkValidFood,
  };
}
