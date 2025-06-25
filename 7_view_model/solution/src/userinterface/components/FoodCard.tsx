import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Food } from "@foodsapp/application/models/food.interface";
import container from "@foodsapp/di/ioc";

interface FoodCardProps {
  food: Food;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  const {
    bgColorTitleCard,
    colorTitleCard,
    handleMouseEnterCard,
    handleMouseLeaveCard,
  } = container.resolve("foodCard");
  return (
    <Box>
      <Flex
        width="28rem"
        height="36rem"
        borderRadius="0.8rem"
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
        cursor="pointer"
      >
        <Flex
          position="relative"
          flexDirection="column"
          height="100%"
          width="100%"
          // onClick={() =>
          //   handleNavigate("/production/presentation/", food.id)
          // }
          data-testid={`food-card-${food.id}`}
        >
          <Box
            position="relative"
            width="100%"
            height="26rem"
            bg="gray.400"
            borderTopRadius="0.8rem"
            overflow="hidden"
          >
            <Image
              src={food?.thumbnail?.url}
              objectFit="cover"
              width="100%"
              height="100%"
              zIndex="1"
            />
          </Box>
          <Flex
            padding="1.6rem"
            height="10rem"
            borderBottomRadius="0.8rem"
            flexDirection="column"
            justifyContent="space-between"
            bg={bgColorTitleCard}
            transition="background 0.15s"
          >
            <Text
              color={colorTitleCard}
              fontSize="1.6rem"
              fontWeight="700"
              transition="background 0.15s"
            >
              {food?.title}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
