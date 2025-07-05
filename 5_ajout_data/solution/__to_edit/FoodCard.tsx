import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const FoodCard = () => {
  return (
    <Box>
      <Flex width="28rem" height="36rem" borderRadius="0.8rem" cursor="pointer">
        <Flex
          position="relative"
          flexDirection="column"
          height="100%"
          width="100%"
        >
          <Box
            position="relative"
            width="100%"
            height="26rem"
            bg="gray.400"
            borderTopRadius="0.8rem"
            overflow="hidden"
          >
            <Image objectFit="cover" width="100%" height="100%" zIndex="1" />
          </Box>
          <Flex
            padding="1.6rem"
            height="10rem"
            borderBottomRadius="0.8rem"
            flexDirection="column"
            justifyContent="space-between"
            transition="background 0.15s"
          >
            <Text
              fontSize="1.6rem"
              fontWeight="700"
              transition="background 0.15s"
            ></Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
