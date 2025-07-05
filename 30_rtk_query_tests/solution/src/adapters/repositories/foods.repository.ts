import { FoodsGateway } from "@foodsapp/infrastructure/gateways/foods.gateway";
import { Food } from "@foodsapp/models/food.interface";

export function FoodsRepository() {
  return {
    async getFoods(): Promise<{ data: Food[]; error?: Error }> {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).getFoods();
      return { data, error };
    },
    async createFood(
      food: Partial<Food>
    ): Promise<{ data: boolean; error?: Error }> {
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
    async updateFood(
      food: Partial<Food>
    ): Promise<{ data: Food; error?: Error }> {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).updateFood(
        food
      );

      return { data, error };
    },
    async deleteFood(
      foodId: string
    ): Promise<{ data: boolean; error?: Error }> {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).deleteFood(
        foodId
      );
      return { data, error };
    },
  };
}
