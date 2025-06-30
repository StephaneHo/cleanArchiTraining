import { factory as factoryBasic, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";
import pineapple from "./assets/ananas.jpg";
import redpepper from "./assets/poivron-rouge.jpg";
import egg from "./assets/oeuf-brun.jpg";
import onion from "./assets/oignon.jpg";
import tomato from "./assets/tomato.jpg";

const FOOD_COUNT = 5;

const ids = ["1", "2", "3", "4", "5"];

const titles = ["ananas", "oeuf", "oignon", "poivron", "tomate"];

const thumbnails = [pineapple, egg, onion, redpepper, tomato];

// generer le schema de la food
export const factory = factoryBasic({
  food: {
    id: primaryKey(String),
    title: String,
    description: String,
    createdAt: String,
    thumbnail: {
      url: String,
    },
  },
});

export const generateFood = (index: number) => {
  return {
    id: ids[index],
    title: titles[index],
    description: faker.lorem.paragraph(3),
    createdAt: faker.date.anytime().toISOString(),
    thumbnail: {
      url: thumbnails[index],
    },
  };
};

export const foodFakeData = [...new Array(FOOD_COUNT)].map((_, index) =>
  factory.food.create(generateFood(index))
);
