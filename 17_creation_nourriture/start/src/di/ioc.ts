import { FoodCardViewModel } from "@foodsapp/components/FoodCard/FoodCardViewModel";
import { NavBarViewModel } from "@foodsapp/components/NavBar/NavBarViewModel";
import { DashboardViewModel } from "@foodsapp/pages/dahsboard/DashboardViewModel";
import { asFunction, createContainer } from "awilix";

const container = createContainer();
// cle: asFunction(Composant)
container.register({
  foodCard: asFunction(FoodCardViewModel),
  dashboard: asFunction(DashboardViewModel),
  nav: asFunction(NavBarViewModel),
});

export { container };
