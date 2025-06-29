export type FoodThumbnail = {
  url: string;
};

export type Food = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  thumbnail: FoodThumbnail;
};
export const ERROR_KEYS = ["createFoodUseCaseErrorMessage"] as const;

export type FoodState = {
  data: Partial<Food>;
  isLoading: boolean;
  errors: Record<(typeof ERROR_KEYS)[number], string>;
};
