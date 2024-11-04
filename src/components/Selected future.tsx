import React from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SelectedProps {
  borderText: string;
  showSearchBar?: boolean;
}

const Selected: React.FC<SelectedProps> = ({
  borderText,
  showSearchBar = false,
}) => {
  return (
    <Box border="solid 1px" borderColor="gray.800" position="relative" p="4">
      <Text
        position="absolute"
        top="0"
        left="0"
        transform="translate(20%, -50%)"
        bg="white"
        px="2"
        as="h2"
        >
        {/* mb={`${!showSearchBar} && "40px"`} */}
        {borderText}
      </Text>

      {showSearchBar && (
        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search..." />
        </InputGroup>
      )}
    </Box>
  );
};

export default Selected;
