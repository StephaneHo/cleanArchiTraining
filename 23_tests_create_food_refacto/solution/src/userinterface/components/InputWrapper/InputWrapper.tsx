import { Box, Input } from "@chakra-ui/react";
import { container as DI } from "@foodsapp/di/ioc";
import { useEffect } from "react";

interface InputWrapperProps {
  name: string;
  onChange: (text: string) => void;
  testId: string;
  value?: string;
}

export const InputWrapper = ({
  name,
  onChange,
  testId,
  value,
}: InputWrapperProps) => {
  const { onChangeValue, text } = DI.resolve("input");
  /*  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue({ value: e.target.value });
    onChange(e.target.value);
  }; */

  useEffect(() => {
    onChangeValue({ value });
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
          onChangeValue({ value: e.target.value }), onChange(e.target.value);
        }}
        data-testid={testId}
        value={text}
        name={name}
      />
    </Box>
  );
};
