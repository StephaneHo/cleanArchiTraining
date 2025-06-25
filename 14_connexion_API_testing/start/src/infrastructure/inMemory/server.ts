import { http, delay, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import { foodFakeData } from "@foodsapp/infrastructure/inMemory/database/food.db";

const ARTIFICIAL_DELAY_MS = 200;

export const handlers = [
  http.get("/fakeApi/getFoods", async () => {
    await delay(ARTIFICIAL_DELAY_MS);

    return HttpResponse.json(foodFakeData);
  }),

  http.get("/fakeApi/getFood/:foodId", async ({ params }: { params: any }) => {
    await delay(ARTIFICIAL_DELAY_MS);

    const { foodId } = params;
    const food = foodFakeData.find((food) => food.id === foodId);

    return HttpResponse.json(food);
  }),

  http.post("/fakeApi/createFood", async ({ request }: { request: any }) => {
    await delay(ARTIFICIAL_DELAY_MS);

    const food = await request.json();
    food.id = uuidv4();
    foodFakeData.push(food);

    return HttpResponse.json(true, { status: 201 });
  }),

  http.patch("/fakeApi/updateFood", async ({ request }: { request: any }) => {
    await delay(ARTIFICIAL_DELAY_MS);

    const updatedfood = await request.json();
    const index = foodFakeData.findIndex((food) => food.id === updatedfood.id);
    foodFakeData.splice(index, 1, updatedfood);

    return HttpResponse.json(true);
  }),

  http.delete(
    "/fakeApi/deleteFood/:foodId",
    async ({ params }: { params: any }) => {
      await delay(ARTIFICIAL_DELAY_MS);

      const { foodId } = params;
      const index = foodFakeData.findIndex((food) => food.id === foodId);
      foodFakeData.splice(index, 1);

      return HttpResponse.json(true);
    }
  ),
];
