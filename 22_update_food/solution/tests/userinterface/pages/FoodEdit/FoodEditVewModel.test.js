/* eslint-env jest */
import { FoodEditViewModel } from "@foodsapp/pages/edit/FoodEditViewModel";
import React from "react";
import * as store from "@foodsapp/store";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const useStateSpy = jest.spyOn(React, "useState");
let initialStateMock = {};
const setStateMock = jest.fn();
const e = { preventDefault: () => {} };
const useDispatchSpy = jest.spyOn(store, "useDispatch");
const useDispatchMock = jest.fn();
describe("Test of FoodEditViewModel ", () => {
  beforeEach(() => {
    useStateSpy.mockImplementation(() => [initialStateMock, setStateMock]);
    useDispatchSpy.mockImplementation(() => {
      return jest.fn().mockImplementation(useDispatchMock);
    });
  });
  test("should submit food onSubmit", async () => {
    initialStateMock = {
      title: "kiwi",
    };
    const { onSubmit } = FoodEditViewModel();

    await onSubmit(e);

    expect(useDispatchMock).toHaveBeenCalledTimes(1);
  });

  test("should check if the food is not empty", () => {
    const { checkValidFood } = FoodEditViewModel();
    const invalidFood = { title: "" };
    expect(checkValidFood(invalidFood)).toBe(false);
  });

  test("should check if the food title is valid", () => {
    const { checkValidFood } = FoodEditViewModel();
    const validTitle = "fruits de la passion";
    console.log("Valid title:", validTitle);
    const validFood = { title: validTitle };
    expect(checkValidFood(validFood)).toBe(true);
    const invalidTitle = "this is ### not a fruit ###";
    const invalidFood = { title: invalidTitle };
    expect(checkValidFood(invalidFood)).toBe(false);
  });
});
