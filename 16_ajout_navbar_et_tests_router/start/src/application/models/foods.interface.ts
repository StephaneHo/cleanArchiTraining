import { Food } from "./food.interface";

export const ERROR_KEYS = ["getFoodsUseCaseErrorMessage"] as const;

export type FoodsState = {
  data: Food[];
  isLoading: boolean;
  errors: Record<(typeof ERROR_KEYS)[number], string>;
};
