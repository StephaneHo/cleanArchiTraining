/* eslint-env jest */
import { FoodEditViewModel } from "@foodsapp/pages/edit/FoodEditViewModel";
import * as store from "@foodsapp/store";
import { useParams } from "react-router-dom";
import { FoodPresenter } from "@foodsapp/adapters/presenters/food.presenter";
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("react", () => ({
  useEffect: jest.fn(),
}));

jest.mock("@foodsapp/store", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@foodsapp/adapters/presenters/food.presenter", () => ({
  FoodPresenter: jest.fn(),
}));

const e = { preventDefault: () => {} };
const useDispatchSpy = jest.spyOn(store, "useDispatch");
const useDispatchMock = jest.fn();
describe("Test of FoodEditViewModel ", () => {
  let useParamsMock = { foodId: undefined };
  let foodPresenterMock = {
    data: {},
  };

  beforeEach(() => {
    useDispatchSpy.mockImplementation(() => {
      return jest.fn().mockImplementation(useDispatchMock);
    });
    useParams.mockImplementation(() => useParamsMock);
    FoodPresenter.mockImplementation(() => foodPresenterMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should submit food onSubmit", async () => {
    useParamsMock = { foodId: "123" };
    const food = { title: "fruits de la passion" };

    foodPresenterMock = { data: food };

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

  test("should send dispatch when the title changes", () => {
    const title = "fruits de la passion";
    const { onChangeTitle } = FoodEditViewModel();
    onChangeTitle(title);
    expect(useDispatchMock).toHaveBeenCalledTimes(1);
  });
});
