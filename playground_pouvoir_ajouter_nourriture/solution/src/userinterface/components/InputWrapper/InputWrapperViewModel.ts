import { useState } from "react";

export function InputWrapperViewModel() {
  const [text, setText] = useState<string>("");
  const onReset = (isReset: boolean) => {
    if (isReset) {
      setText("");
    }
  };

  const colorSelector = ({
    value,
    minLength,
    maxLength,
  }: {
    value: string;
    minLength: number;
    maxLength: number;
  }) => {
    if (
      value?.length >= maxLength ||
      (value?.length < minLength && value?.length !== 0) ||
      (typeof value === "string" && !value?.trim()?.length && value?.length)
    ) {
      return "red.300";
    }

    return "gray.500";
  };

  const onChangeValue = ({
    value,
    maxLength,
  }: {
    value: string;
    maxLength: number;
  }) => {
    if (value?.length <= maxLength) {
      setText(value);
    }
  };
  return {
    text,
    onReset,
    onChangeValue,
    colorSelector,
  };
}
