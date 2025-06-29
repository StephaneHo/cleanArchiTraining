import { Button, Container, Heading, HStack } from "@chakra-ui/react";
import NavBar from "@foodsapp/components/NavBar/NavBar";

export const FoodEditPage = () => {
  return (
    <>
      <NavBar />
      <form>
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
            textAlign="center"
            fontWeight="300"
            mb="3rem"
            data-testid="title-page"
          >
            Ajoutez un nouvel article
          </Heading>
          <Container maxWidth={"400px"}>
            <InputWrapper
              name="title"
              testId="inputwrapper-title"
              onChange={() => null}
            />
          </Container>
          <HStack mt="2rem" justify="center">
            <Button
              type="submit"
              py="2.2rem"
              px="1.6rem"
              bg="blue.800"
              fontSize="1.6rem"
              fontWeight="500"
              color="white"
              data-testid="submit-form-configuration"
              onClick={() => null}
              _hover={{
                color: "blue.800",
                bg: "blue.300",
              }}
            >
              Créer
            </Button>
          </HStack>
        </Container>
      </form>
    </>
  );
};
