import { Singleton } from "@foodsapp/infrastructure/helper/singleton";
import axios from "axios";
export class FoodsGateway extends Singleton {
  async getFoods() {
    try {
      const res = await axios.get("/fakeApi/getFoods");
      const data = res.data;
      console.log("foods gateway data ", data);
      return { data };
    } catch (e) {
      const error = e as Error;
      return { error };
    }
  }
}
