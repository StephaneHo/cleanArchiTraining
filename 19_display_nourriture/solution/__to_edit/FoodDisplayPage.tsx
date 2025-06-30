import { Heading, Container } from "@chakra-ui/react";
import { NavBar } from "@foodsapp/components/NavBar/NavBar";
export const FoodDisplayPage = () => {
  return (
    <>
      <NavBar />
      <Container
        bg="blue.100"
        borderRadius="2rem"
        margin="2rem auto"
        paddingY="4.2rem"
        width="calc(100% - 3.2rem)"
        minHeight="55.6rem"
        maxWidth="auto"
      >
        <Container maxWidth={"400px"}>
          <Heading
            color="black"
            fontSize="5rem"
            textAlign="center"
            fontWeight="300"
            maxWidth="100rem"
            data-testid="display-page-title"
          >
            {/* {food?.title} */}
          </Heading>
        </Container>
      </Container>
    </>
  );
};
