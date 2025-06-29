import { Box, Input } from "@chakra-ui/react";
// import { CharacterCounter }

export const InputWarpper = () => {
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
        // minLength={minLength}
        // maxLength={maxLength}
        // value={text}
        // name={name}
      />

      {/* {maxLength && (
        <Box position="absolute" right="1rem" bottom="1rem">
          <CharacterCounter
            colorSelector={colorSelector}
            minLength={minLength}
            maxLength={maxLength}
            value={text}
          />
        </Box>
      )} */}
    </Box>
  );
};
