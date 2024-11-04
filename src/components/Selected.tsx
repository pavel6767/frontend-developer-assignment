import React, { useContext } from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { groupEmailsByDomain } from "../utils";
import { EmailsContext } from "../state/emails";

interface SelectedProps {
  borderText: string;
  showSearchBar?: boolean;
}

const Selected: React.FC<SelectedProps> = ({
  borderText,
  showSearchBar = false,
}) => {
    // const { state: {selected} } = useContext(EmailsContext);
    const { state } = useContext(EmailsContext);
    // const groupedEmails = groupEmailsByDomain(state.selected);

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
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Box>
  );
};

export default Selected;
