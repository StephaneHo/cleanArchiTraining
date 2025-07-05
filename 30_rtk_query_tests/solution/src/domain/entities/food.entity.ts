import { VALID_TITLE_PATTERN } from "@foodsapp/utils/constants";

export class FoodEntity {
  isValidTitle(title: string): boolean {
    return title.trim().length > 0 && VALID_TITLE_PATTERN.test(title);
  }
}
