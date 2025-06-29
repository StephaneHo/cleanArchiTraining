import { Box, Input } from "@chakra-ui/react";

export const InputWrapper = () => {
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
        // onChange={null}
        // data-testid={testId}
        // value={text}
        // name={name}
      />
    </Box>
  );
};
