import { useNavigate } from "react-router-dom";
import { useDispatch } from "@foodsapp/store";
import { resetFoodUseCase } from "@foodsapp/usecases/food.usecase";

export function NavBarViewModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNavigate = (path: string) => {
    dispatch(resetFoodUseCase());
    navigate(path);
  };

  return { onNavigate };
}
