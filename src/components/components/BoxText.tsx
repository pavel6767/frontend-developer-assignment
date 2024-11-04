import React from "react";
import { Text } from "@chakra-ui/react";

interface BoxTextProps {
  borderText: string;
}

const BoxText: React.FC<BoxTextProps> = ({ borderText }) => (
  <Text
    position="absolute"
    top="0"
    left="0"
    transform="translate(20%, -50%)"
    bg="white"
    px="2"
    as="h2"
  >
    {borderText}
  </Text>
);

export default BoxText;
