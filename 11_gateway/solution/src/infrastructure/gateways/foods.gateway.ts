import { foodFakeData } from "@foodsapp/infrastructure/inMemory/database/food.db";
import { Food } from "@foodsapp/models/food.interface";
import { Singleton } from "@foodsapp/infrastructure/helper/singleton";
export class FoodsGateway extends Singleton {
  async getFoods(): Promise<Food[]> {
    try {
      return foodFakeData;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }
}
