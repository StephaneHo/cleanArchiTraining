/* eslint-env jest */
import React from "react";
import { FoodCardViewModel } from "@foodsapp/components/FoodCard/FoodCardViewModel";
import { useNavigate } from "react-router-dom";
import {
  BG_COLOR_TITLE_CARD,
  COLOR_TITLE_CARD,
} from "@foodsapp/utils/constants";
import * as store from "@foodsapp/store";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const useDispatchSpy = jest.spyOn(store, "useDispatch");
describe("Test of FoodCardViewModel ", () => {
  const useStateSpy = jest.spyOn(React, "useState");
  // on va regarder quels arguments ont ete passes au useStateMock
  const setStateMock = jest.fn();
  const useNavigateMock = jest.fn();
  const useDispatchMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => useNavigateMock);
    useStateSpy.mockImplementation((state) => [state, setStateMock]);

    useDispatchSpy.mockImplementation(() => {
      return jest.fn().mockImplementation(useDispatchMock);
    });
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

  test("should navigate correctly to display food with correct food id", () => {
    const path = "/path/1";

    const { navigate } = FoodCardViewModel();
    navigate(path);

    expect(useNavigateMock).toHaveBeenCalledTimes(1);
    expect(useNavigateMock).toHaveBeenCalledWith(path);
  });

  test("should dispatch deleteFoodUseCase on handleDeleteFood", () => {
    const foodId = "123";
    const { handleDelete } = FoodCardViewModel();

    handleDelete(foodId);

    expect(useDispatchMock).toHaveBeenCalledTimes(1);
  });
});
