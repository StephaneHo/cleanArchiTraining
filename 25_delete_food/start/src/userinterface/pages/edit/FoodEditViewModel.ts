import { FoodPresenter } from "@foodsapp/adapters/presenters/food.presenter";
import { FoodEntity } from "@foodsapp/domain/entities/food.entity";
import { Food } from "@foodsapp/models/food.interface";
import { useDispatch } from "@foodsapp/store";
import {
  createFoodUseCase,
  getFoodUseCase,
  updateFoodUseCase,
} from "@foodsapp/usecases/food.usecase";
import { ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function FoodEditViewModel() {
  const { data: food, isLoading } = FoodPresenter();

  const { foodId } = useParams() as { foodId: string };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeTitle = (title: string) => {
    const foodToUpdate = { title };
    dispatch(updateFoodUseCase({ foodToUpdate }));
  };

  const checkValidFood = (food: Food) => {
    const foodEntity = new FoodEntity();
    return foodEntity.isValidTitle(food.title);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkValidFood(food as Food)) {
      console.error("Title is invalid");
      return;
    }

    let res;
    if (foodId) {
      res = await dispatch(
        updateFoodUseCase({ foodToUpdate: food, isSavedOnServer: true })
      );
    } else {
      res = await dispatch(createFoodUseCase({ food }));
    }
    if (res?.meta?.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (foodId !== food?.id) {
      dispatch(getFoodUseCase({ foodId }));
    }
  }, [dispatch, food?.id, foodId]);

  return {
    food,
    isLoading,
    onChangeTitle,
    onSubmit,
    checkValidFood,
  };
}
