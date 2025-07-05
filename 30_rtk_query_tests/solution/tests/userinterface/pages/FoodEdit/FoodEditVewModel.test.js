/* eslint-env jest */
import { FoodEditViewModel } from "@foodsapp/pages/edit/FoodEditViewModel";
import { useParams } from "react-router-dom";
import { FoodPresenter } from "@foodsapp/adapters/presenters/food.presenter";
import React from "react";
import {
  createFoodUseCase,
  updateFoodUseCase,
} from "@foodsapp/usecases/food.usecase";
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("react", () => ({
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

jest.mock("@foodsapp/store", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

jest.mock("@foodsapp/adapters/presenters/food.presenter", () => ({
  FoodPresenter: jest.fn(),
}));

jest.mock("@foodsapp/usecases/food.usecase", () => ({
  createFoodUseCase: jest.fn(),
  updateFoodUseCase: jest.fn(),
}));

describe("Test of FoodEditViewModel ", () => {
  let useParamsMock = { foodId: undefined };
  let foodPresenterMock = {
    data: {},
  };
  const e = { preventDefault: () => {} };
  const useStateSpy = jest.spyOn(React, "useState");
  const setStateMock = jest.fn();
  const setStateFx = jest
    .fn()
    .mockImplementation((fn) => setStateMock(fn(useStateSpy)));
  let initialStateMock = { id: 1 };
  const updateFoodUseCaseMock = jest.fn();
  const createFoodUseCaseMock = jest.fn();

  beforeEach(() => {
    useParams.mockImplementation(() => useParamsMock);
    FoodPresenter.mockImplementation(() => foodPresenterMock);
    useStateSpy.mockImplementation(() => [initialStateMock, setStateFx]);
    createFoodUseCase.mockImplementation(createFoodUseCaseMock);
    updateFoodUseCase.mockImplementation(updateFoodUseCaseMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should send dispatch when the title changes", () => {
    const title = "fruits de la passion";
    const { onChangeTitle } = FoodEditViewModel();
    onChangeTitle(title);
    expect(setStateMock).toHaveBeenCalledTimes(1);

    //jestjs.io/docs/mock-functions
    expect(
      setStateMock.mock.calls[0][0].mock.results[0].value[0]
    ).toMatchObject(initialStateMock);

    // https://jestjs.io/docs/expect#expectobjectcontainingobject
    expect(setStateMock).toHaveBeenCalledWith(
      expect.objectContaining({ title })
    );
  });

  test("should create food onSubmit", async () => {
    useParamsMock = { foodId: null };
    initialStateMock = { title: "kiwi" };

    const { onSubmit } = FoodEditViewModel();

    await onSubmit(e);

    expect(createFoodUseCaseMock).toHaveBeenCalledTimes(1);
    expect(createFoodUseCaseMock).toHaveBeenCalledWith({
      food: initialStateMock,
    });
  });
  test("should update food onSubmit", async () => {
    useParamsMock = { foodId: 1 };

    initialStateMock = { title: "kiwi" };
    const { onSubmit } = FoodEditViewModel();
    await onSubmit(e);

    expect(updateFoodUseCaseMock).toHaveBeenCalledTimes(1);
    expect(updateFoodUseCaseMock).toHaveBeenCalledWith({
      foodToUpdate: initialStateMock,
    });
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
