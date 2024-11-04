import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Icon,
  Button,
  Flex,
  Grid,
  UnorderedList,
  ListItem,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import { EmailsContext } from "../state/emails";
import { groupEmailsByDomain } from "../utils";

interface AvailableProps {
  borderText: string;
  showSearchBar?: boolean;
}

const Available: React.FC<AvailableProps> = ({
  borderText,
  showSearchBar = false,
}) => {
  const { state } = useContext(EmailsContext);
  const [expanded, setExpanded] = useState(new Set());
  const [groupedEmails, setGroupedEmails] = useState(
    groupEmailsByDomain(state.available)
  );
  
  useEffect(() => {
    setGroupedEmails(() => groupEmailsByDomain(state.available));
  },[state.available])



  const handleSelectEmail = (email: string) => {
    return null;
  };
  const handleSelectDomain = (event: React.MouseEvent, emails: string[]) => {
    event.stopPropagation();
    return null;
  };

  const handleAccordionClick = (domain: string) => {
    setExpanded((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(domain)) newState.delete(domain);
      else newState.add(domain);
      return newState;
    });
  };

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

      <Box>
        <Accordion allowToggle>
          {Object.entries(groupedEmails).map(([domain, domainEmails]) =>
            domainEmails.length > 1 ? (
              <AccordionItem key={domain}>
                <AccordionButton
                  onClick={handleAccordionClick.bind(null, domain)}
                >
                  <Grid
                    templateColumns="20px 3fr 1fr"
                    alignItems="center"
                    w="100%"
                  >
                    <Icon
                      as={
                        expanded.has(domain) ? ChevronUpIcon : ChevronDownIcon
                      }
                    />
                    <Text textAlign="left">{domain}</Text>
                    <Button
                      size="sm"
                      onClick={(event) =>
                        handleSelectDomain(event, domainEmails)
                      }
                    >
                      Domain Action
                    </Button>
                  </Grid>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <UnorderedList styleType="none">
                    {domainEmails.map((email) => (
                      <ListItem key={email} py="1" pl="3">
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          w="100%"
                        >
                          <Text>{email}</Text>
                          <Button
                            size="sm"
                            ml={4}
                            onClick={handleSelectEmail.bind(null, email)}
                          >
                            Select
                          </Button>
                        </Flex>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            ) : (
              <UnorderedList key={domain} styleType="none">
                <ListItem px="3" py="1">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="100%"
                  >
                    <Text>{domainEmails[0]}</Text>
                    <Button
                      size="sm"
                      ml={4}
                      onClick={handleSelectEmail.bind(null, domainEmails[0])}
                    >
                      Select
                    </Button>
                  </Flex>
                </ListItem>
              </UnorderedList>
            )
          )}
        </Accordion>
      </Box>
    </Box>
  );
};

export default Available;
