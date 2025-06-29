import { Button, Container, Heading, HStack } from "@chakra-ui/react";
import { InputWarpper } from "../../components/InputWrapper/InputWrapper";
import { container as DI } from "@foodsapp/di/ioc";
import NavBar from "@foodsapp/components/NavBar/NavBar";

//import { TextField }
interface FoodEditPageProps {
  update?: boolean;
}

export const FoodEditPage = ({ update }: FoodEditPageProps) => {
  const { food, onChangeTitle, MIN_LENGTH_TITLE, MAX_LENGTH_TITLE, onSubmit } =
    DI.resolve("edit");
  return (
    <>
      <NavBar />
      <form>
        <Container
          bg="gray.200"
          maxW="120rem"
          width="100%"
          paddingTop="6.2rem"
          borderRadius="2rem"
        >
          <Heading
            fontSize="4rem"
            textAlign="center"
            fontWeight="300"
            mb="3rem"
            data-testid="title-page"
          >
            {update ? "Mise a jour" : "Création"}
          </Heading>

          <InputWarpper
            name="title"
            type="text"
            value={food?.title}
            testId="inputwrapper-title"
            onChange={onChangeTitle}
            minLength={MIN_LENGTH_TITLE}
            maxLength={MAX_LENGTH_TITLE}
            isReset={false}
            //  isReset={food && Object.keys(food).length === 0}
          />

          <HStack mt="2rem" justify="center">
            <Button
              type="submit"
              py="2.2rem"
              px="1.6rem"
              bg="black"
              fontSize="1.6rem"
              fontWeight="500"
              color="white"
              data-testid="submit-form-configuration"
              onClick={onSubmit}
              _hover={{
                color: "gray.800",
                bg: "gray.500",
              }}
            >
              Creer
            </Button>
          </HStack>
        </Container>
      </form>
    </>
  );
};
