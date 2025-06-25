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
