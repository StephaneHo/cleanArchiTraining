/* eslint-env jest */
import React from "react";
import { InputWrapperViewModel } from "@foodsapp/components/InputWrapper/InputWrapperViewModel";

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

  test("should setText when value <= maxLength on onChangeValue ", () => {
    // on va espionner la fonction setState et on va appliquer un spy

    const { onChangeValue } = InputWrapperViewModel();

    const value = "asdfklj;asdfsf";
    const maxLength = 20;
    onChangeValue({ value, maxLength });

    expect(setStateMock).toHaveBeenCalledTimes(1);
    expect(setStateMock).toHaveBeenCalledWith(value);
  });

  test("should on Reset ", () => {
    // on va espionner la fonction setState et on va appliquer un spy

    const { onReset } = InputWrapperViewModel();
    onReset(true);

    expect(setStateMock).toHaveBeenCalledTimes(1);
    expect(setStateMock).toHaveBeenCalledWith("");
  });

  test("should on Reset 2", () => {
    // on va espionner la fonction setState et on va appliquer un spy

    const { onReset } = InputWrapperViewModel();
    onReset(false);

    expect(setStateMock).not.toHaveBeenCalled();
  });
});
