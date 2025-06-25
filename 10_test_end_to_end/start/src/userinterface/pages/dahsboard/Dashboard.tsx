import { Container, Grid, Heading } from "@chakra-ui/react";
import { FoodCard } from "@foodsapp/components/FoodCard/FoodCard";
import { container as DI } from "@foodsapp/di/ioc";
import { Food } from "@foodsapp/models/food.interface";

export const DashboardPage = () => {
  const { foods } = DI.resolve("dashboard");
  return (
    <>
      <Container
        position="relative"
        bg="blue.100"
        borderRadius="2rem"
        margin="2rem auto"
        paddingY="4.2rem"
        width="calc(100% - 3.2rem)"
        minHeight="55.6rem"
        maxWidth="auto"
      >
        <Heading
          fontSize="4rem"
          color="black"
          textAlign="center"
          fontWeight="300"
          data-testid="title-page"
        >
          Découvrir
        </Heading>

        <Grid
          templateColumns="repeat(auto-fill, 28.1rem)"
          gap="2rem"
          justifyContent="center"
          maxWidth="175rem"
          paddingY="3.2rem"
          margin="auto"
        >
          {foods.map((food: Food, index: number) => (
            <FoodCard key={food.id + index} food={food} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
