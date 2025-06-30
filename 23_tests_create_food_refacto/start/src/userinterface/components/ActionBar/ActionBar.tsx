import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { ActionButton } from "@foodsapp/components/ActionButton/ActionButton";

export interface ActionBarProps extends BoxProps {
  onDelete: () => void;
  onNavigate: () => void;
  foodId: string;
}

export const ActionBar = ({ foodId, onNavigate, onDelete }: ActionBarProps) => {
  return (
    <Box>
      <Flex
        position="absolute"
        zIndex="99"
        bg="blue.500"
        borderRadius="0.8rem"
        flexDirection="column"
        paddingY="0.5rem"
        padding="0.4rem"
        marginX="22rem"
        marginY="-9.5rem"
        color="white"
        border="0.5px solid"
        borderColor="gray.700"
      >
        <ActionButton onClick={onNavigate}>
          <BiEdit size="24px" data-testid={`update-food-${foodId}`} />
        </ActionButton>
        <ActionButton onClick={onDelete}>
          <HiOutlineTrash size="24px" data-testid={`delete-food-${foodId}`} />
        </ActionButton>
      </Flex>
    </Box>
  );
};
