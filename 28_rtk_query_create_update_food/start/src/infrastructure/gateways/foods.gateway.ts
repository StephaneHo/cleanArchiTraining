import { Singleton } from "@foodsapp/infrastructure/helper/singleton";
import { Food } from "@foodsapp/models/food.interface";
import axios from "axios";
export class FoodsGateway extends Singleton {
  async getFoods() {
    try {
      const res = await axios.get("/fakeApi/getFoods");
      const data = res.data;
      return { data };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
  async createFood(food: Partial<Food>) {
    try {
      const res = await axios.post("/fakeApi/createFood", food);
      const data = res.data;
      return { data };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
  async getFood(foodId: string) {
    try {
      const res = await axios.get(`/fakeApi/getFood/${foodId}`);
      const data = res.data;
      return { data };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
  async updateFood(food: Partial<Food>) {
    try {
      const res = await axios.patch("/fakeApi/updateFood", food);
      const data = res.data;
      return { data };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
  async deleteFood(foodId: string) {
    try {
      const res = await axios.delete(`/fakeApi/deleteFood/${foodId}`);
      const data = res.data;
      return { data };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
}
