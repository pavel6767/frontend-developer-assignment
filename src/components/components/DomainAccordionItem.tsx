import React from "react";
import {
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  UnorderedList,
  ListItem,
  Box,
  Text,
} from "@chakra-ui/react";

import { stopPropagation } from "../../utils";
import CustomAccordionButton from "./CustomAccordionButton";

interface IDataProps {
  domain: string;
  domainEmails: string[];
  buttonLabel: string;
}
interface IStateProps {
  expanded: Set<string>;
}
interface IHandlersProps {
  handleAccordionClick: Function;
  handleSelectDomain: Function;
  handleSelectEmail: Function;
}

interface DomainAccordionItemProps {
  data: IDataProps;
  state: IStateProps;
  handlers: IHandlersProps;
}

const DomainAccordionItem: React.FC<DomainAccordionItemProps> = ({
  data: { domain, domainEmails, buttonLabel },
  state: { expanded },
  handlers: { handleAccordionClick, handleSelectDomain, handleSelectEmail },
}) => (
  <AccordionItem key={domain}>
    <CustomAccordionButton
      {...{
        data: { domain, buttonLabel },
        state: { expanded: expanded.has(domain) },
        handlers: { handleAccordionClick, handleSelectDomain },
      }}
    />
    <AccordionPanel pb={4}>
      <UnorderedList styleType="none">
        {domainEmails.map((email, emailIndex) => (
          <ListItem key={email} py="1" pl="3">
            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Text>{email}</Text>
              <Box onClick={stopPropagation}>
                <Button
                  size="sm"
                  ml={4}
                  onClick={handleSelectEmail.bind(
                    null,
                    domain,
                    email,
                    emailIndex
                  )}
                >
                  {buttonLabel}
                </Button>
              </Box>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    </AccordionPanel>
  </AccordionItem>
);

export default DomainAccordionItem;
