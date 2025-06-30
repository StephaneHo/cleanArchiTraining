import { Box, Flex } from "@chakra-ui/react";
import { HiOutlineBookOpen, HiOutlinePlusCircle } from "react-icons/hi";
import { ActionButton } from "@foodsapp/components/ActionButton/ActionButton";
import { container as DI } from "@foodsapp/di/ioc";
export const NavBar = () => {
  const { onNavigate } = DI.resolve("nav");
  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="999"
      bg="blue.200"
      height="5rem"
      alignItems="center"
      boxShadow="0px 0px 20px 2px rgba(0, 0, 0, 0.2)"
    >
      <Flex
        alignItems="center"
        gap=".8rem"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        <Box _hover={{ color: "white", bg: "blue.500" }}>
          <ActionButton onClick={() => onNavigate("/")}>
            <HiOutlineBookOpen
              size="24px"
              color="inherit"
              data-testid="navlink-dashboard"
            />
          </ActionButton>
        </Box>
        <Box _hover={{ color: "white", bg: "blue.500" }}>
          <ActionButton onClick={() => onNavigate("/edit")}>
            <HiOutlinePlusCircle
              size="24px"
              color="inherit"
              data-testid="navlink-edit"
            />
          </ActionButton>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
