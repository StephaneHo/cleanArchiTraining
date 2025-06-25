import { FoodCardViewModel } from "@foodsapp/components/FoodCardViewModel";
import { asFunction, createContainer } from "awilix";

const container = createContainer();
// cle: asFunction(Composant)
container.register({
  foodCard: asFunction(FoodCardViewModel),
});

export default container;
