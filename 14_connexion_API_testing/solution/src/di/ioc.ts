import { FoodCardViewModel } from "@foodsapp/components/FoodCard/FoodCardViewModel";
import { DashboardViewModel } from "@foodsapp/pages/dahsboard/DashboardViewModel";
import { asFunction, createContainer } from "awilix";

const container = createContainer();
// cle: asFunction(Composant)
container.register({
  foodCard: asFunction(FoodCardViewModel),
  dashboard: asFunction(DashboardViewModel),
});

export { container };
