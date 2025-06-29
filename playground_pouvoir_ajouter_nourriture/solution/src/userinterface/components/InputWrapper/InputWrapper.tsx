import { Box, Input } from "@chakra-ui/react";
import { useEffect } from "react";
// import { CharacterCounter }
import { container as DI } from "@foodsapp/di/ioc";
import { InputLengthIndicator } from "../InputLengthIndicator/InputLengthIndicator";
interface InputWarpperProps {
  name: string;
  value?: string;
  type: string;
  isReset?: boolean;
  onChange: (text: string) => void;
  testId: string;
  minLength: number;
  maxLength: number;
}

export const InputWarpper = ({
  name,
  value,
  isReset,
  testId,
  minLength,
  maxLength,
  onChange,
}: InputWarpperProps) => {
  const { onReset, text, onChangeValue, colorSelector } = DI.resolve("input");
  useEffect(() => {
    onReset(isReset);
  }, [isReset]);

  useEffect(() => {
    onChangeValue({ value, maxLength });
  }, [value]);
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Input
        w="100%"
        h="5rem"
        padding="1.5rem"
        bg="white"
        fontSize="1.6rem"
        borderRadius=".4rem"
        placeholder="Titre"
        variant="default"
        onChange={(e) => {
          onChangeValue({ value: e.target.value, maxLength }),
            onChange(e.target.value);
        }}
        data-testid={testId}
        minLength={minLength}
        maxLength={maxLength}
        value={text}
        name={name}
      />

      {maxLength && (
        <Box position="absolute" right="1rem" bottom="1rem">
          <InputLengthIndicator
            colorSelector={colorSelector}
            minLength={minLength}
            maxLength={maxLength}
            value={text}
          />
        </Box>
      )}
    </Box>
  );
};
