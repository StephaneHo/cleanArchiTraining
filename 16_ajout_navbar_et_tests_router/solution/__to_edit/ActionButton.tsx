import { MouseEvent, TouchEvent, ReactNode } from "react";
import { HStack } from "@chakra-ui/react";

interface ActionButtonProps {
  children: ReactNode;
  onClick: (e: MouseEvent | TouchEvent) => void;
}

export const ActionButton = ({ children, onClick }: ActionButtonProps) => {
  return (
    <HStack
      as="button"
      width="4rem"
      height="4rem"
      borderRadius="0.4rem"
      transition="background 0.15s"
      justifyContent="center"
      onClick={onClick}
    >
      {children}
    </HStack>
  );
};
