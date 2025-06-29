/* eslint-env jest */
import React from "react";
import { FoodCardViewModel } from "@foodsapp/components/FoodCard/FoodCardViewModel";

import {
  BG_COLOR_TITLE_CARD,
  COLOR_TITLE_CARD,
} from "@foodsapp/utils/constants";
describe("Test of FoodCardViewModel ", () => {
  const useStateSpy = jest.spyOn(React, "useState");
  // on va regarder quels arguments ont ete passes au useStateMock
  const setStateMock = jest.fn();

  beforeEach(() => {
    useStateSpy.mockImplementation((state) => [state, setStateMock]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should change the color title and background color title on handleMouseEnterCard", () => {
    // on va espionner la fonction setState et on va appliquer un spy

    const { handleMouseEnterCard } = FoodCardViewModel();
    handleMouseEnterCard();

    expect(setStateMock).toHaveBeenCalledTimes(2);
    expect(setStateMock).toHaveBeenCalledWith(BG_COLOR_TITLE_CARD);
    expect(setStateMock).toHaveBeenCalledWith(COLOR_TITLE_CARD);
  });

  test("should change the color title and background color title on handleMouseLeaveCard", () => {
    // on va espionner la fonction setState et on va appliquer un spy

    const { handleMouseLeaveCard } = FoodCardViewModel();
    handleMouseLeaveCard();

    expect(setStateMock).toHaveBeenCalledTimes(2);
    expect(setStateMock).toHaveBeenCalledWith(COLOR_TITLE_CARD);
    expect(setStateMock).toHaveBeenCalledWith(BG_COLOR_TITLE_CARD);
  });
});
