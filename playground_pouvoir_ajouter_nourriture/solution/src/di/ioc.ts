import { FoodCardViewModel } from "@foodsapp/components/FoodCard/FoodCardViewModel";
import { InputWrapperViewModel } from "@foodsapp/components/InputWrapper/InputWrapperViewModel";
import { NavBarViewModel } from "@foodsapp/components/NavBar/NavBarViewModel";
import { DashboardViewModel } from "@foodsapp/pages/dahsboard/DashboardViewModel";
import { FoodEditViewModel } from "@foodsapp/pages/edit/FoodEditViewModel";
import { asFunction, createContainer } from "awilix";

const container = createContainer();
// cle: asFunction(Composant)
container.register({
  foodCard: asFunction(FoodCardViewModel),
  dashboard: asFunction(DashboardViewModel),
  input: asFunction(InputWrapperViewModel),
  edit: asFunction(FoodEditViewModel),
  nav: asFunction(NavBarViewModel),
});

export { container };
