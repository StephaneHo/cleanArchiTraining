import { FoodsGateway } from "@foodsapp/infrastructure/gateways/foods.gateway";
import { Food } from "@foodsapp/models/food.interface";

export function FoodsRespository() {
  return {
    async getFoods(): Promise<{ data: Food[]; error?: Error }> {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).getFoods();
      return { data, error };
    },
    async createFood(food: Partial<Food>) {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).createFood(
        food
      );
      return { data, error };
    },
    async getFood(foodId: string): Promise<{ data: Food; error?: Error }> {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).getFood(
        foodId
      );
      return { data, error };
    },
  };
}
