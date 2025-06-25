import { FoodsGateway } from "@foodsapp/infrastructure/gateways/foods.gateway";
import { Food } from "@foodsapp/models/food.interface";

export function FoodsRespository() {
  return {
    async getFoods(): Promise<{ data: Food[]; error?: Error }> {
      const foodsGateway = FoodsGateway.getInstance();

      const { data, error } = await (foodsGateway as FoodsGateway).getFoods();
      console.log("gateway data", data);
      return { data, error };
    },
  };
}
