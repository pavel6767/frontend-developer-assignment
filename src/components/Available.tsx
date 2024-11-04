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
  const {
    state: { available },
    setState,
  } = useContext(EmailsContext);
  const [expanded, setExpanded] = useState(new Set());

  // :P:: TODO: still need to sort
  // useEffect(() => {
  //   setGroupedEmails(() => groupEmailsByDomain(state.available));
  // }, [state.available]);

  const handleSelectEmail = (
    domain: string,
    email: string,
    index: number = 0
  ) => {
    setState((prevState) => {
      const newState = structuredClone(prevState);

      if (!newState.selected[domain]) newState.selected[domain] = [];
      newState.selected[domain].push(email);
      newState.selected[domain].sort();

      newState.available[domain].splice(index, 1);
      if (!newState.available[domain].length) delete newState.available[domain];

      return newState;
    });
  };

  const handleSelectDomain = (event: React.MouseEvent, domain: string) => {
    event.stopPropagation();
    setState((prevState) => {
      const newState = structuredClone(prevState);

      if (!newState.selected[domain]) newState.selected[domain] = [];
      newState.selected[domain].push(...newState.available[domain]);
      newState.selected[domain].sort();

      delete newState.available[domain];
      return newState;
    });
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
          {Object.entries(available).map(([domain, domainEmails]) =>
            domainEmails.length > 1 ? (
              <AccordionItem key={domain}>
                <AccordionButton
                  as="div"
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
                        handleSelectDomain(event, domain)
                      }
                    >
                      Select Domain
                    </Button>
                  </Grid>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <UnorderedList styleType="none">
                    {domainEmails.map((email, emailIndex) => (
                      <ListItem key={email} py="1" pl="3">
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          w="100%"
                        >
                          <Text>{email}</Text>
                          <Box onClick={(event) => event.stopPropagation()}>
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
                              Select
                            </Button>
                          </Box>
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
                    <Box onClick={(event) => event.stopPropagation()}>
                      <Button
                        size="sm"
                        ml={4}
                        onClick={handleSelectEmail.bind(
                          null,
                          domain,
                          domainEmails[0]
                        )}
                      >
                        Select
                      </Button>
                    </Box>
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
