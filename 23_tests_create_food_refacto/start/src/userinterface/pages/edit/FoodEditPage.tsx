import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import NavBar from "@foodsapp/components/NavBar/NavBar";
import { InputWrapper } from "@foodsapp/components/InputWrapper/InputWrapper";
import { container as DI } from "@foodsapp/di/ioc";
export const FoodEditPage = ({ update }: { update: boolean }) => {
  const { onChangeTitle, onSubmit, isLoading, food } = DI.resolve("edit");
  const commandLabel = update ? "Mettre à jour" : "Créer";
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
          {isLoading ? (
            <Flex align="center" justify="center">
              <Spinner
                color="blue.500"
                borderWidth="4px"
                size="xl"
                marginTop="150px"
              />
            </Flex>
          ) : (
            <>
              <Container maxWidth={"400px"}>
                <InputWrapper
                  name="title"
                  testId="inputwrapper-title"
                  onChange={onChangeTitle}
                  value={food?.title || ""}
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
                  data-testid="submit-form-edit"
                  onClick={onSubmit}
                  _hover={{
                    color: "blue.800",
                    bg: "blue.300",
                  }}
                >
                  {commandLabel}
                </Button>
              </HStack>{" "}
            </>
          )}
        </Container>
      </form>
    </>
  );
};
