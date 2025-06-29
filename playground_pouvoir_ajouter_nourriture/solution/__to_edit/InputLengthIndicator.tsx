import { Box, Text } from "@chakra-ui/react";

interface CharacterCounterProps {
  colorSelector: ({
    value,
    minLength,
    maxLength,
  }: {
    value?: string;
    minLength?: number;
    maxLength?: number;
  }) => string;
  maxLength?: number;
  minLength?: number;
  value?: string;
}

export const CharacterCounter = ({
  colorSelector,
  maxLength = 500,
  minLength = 0,
  value,
}: CharacterCounterProps) => {
  const v = value || "";

  return (
    <Box marginLeft="1rem" display="flex" justifyContent="flex-end">
      <Text
        color={colorSelector({ value, minLength, maxLength })}
        fontSize="1.1rem"
        userSelect="none"
      >
        {v?.length}&nbsp;
      </Text>
      <Text
        color={v?.length >= maxLength ? "red.300" : "gray.500"}
        fontSize="1.1rem"
        userSelect="none"
      >
        /&nbsp;{maxLength}
      </Text>
    </Box>
  );
};
