import React from "react";
import {
  Button,
  Flex,
  ListItem,
  Box,
  Text,
} from "@chakra-ui/react";
import { stopPropagation } from "../../utils";

interface IDataProps {
  label: string;
  domain: string;
  email: string;
  emailIndex: number;
}

interface IHandlersProps {
  handleSelectEmail: Function;
}

interface UnorderedListItemProps {
  data: IDataProps;
  handlers: IHandlersProps;
}
const UnorderedListItem: React.FC<UnorderedListItemProps> = ({
  data: { label, domain, email, emailIndex },
  handlers: { handleSelectEmail },
}) => {
  return (
    <ListItem key={email} py="1" pl="3">
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Text>{email}</Text>
        <Box onClick={stopPropagation}>
          <Button
            size="sm"
            ml={4}
            onClick={handleSelectEmail.bind(null, domain, email, emailIndex)}
          >
            {label}
          </Button>
        </Box>
      </Flex>
    </ListItem>
  );
};

export default UnorderedListItem;
