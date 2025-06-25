import { foodFakeData } from "@foodsapp/infrastructure/inMemory/database/food.db";
import { Singleton } from "@foodsapp/infrastructure/helper/singleton";
export class FoodsGateway extends Singleton {
  async getFoods() {
    try {
      return { data: foodFakeData };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
}
