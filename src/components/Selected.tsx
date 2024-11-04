import React, { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { EmailsContext } from "../state/emails";

interface SelectedProps {
  borderText: string;
  showSearchBar?: boolean;
}

const Selected: React.FC<SelectedProps> = ({
  borderText,
  showSearchBar = false,
}) => {
  const {
    state: { selected },
  } = useContext(EmailsContext);
  const [expanded, setExpanded] = useState(new Set());

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

      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton
            as="div"
            onClick={handleAccordionClick.bind(null, "company recipients")}
          >
            <Grid templateColumns="20px 3fr 1fr" alignItems="center" w="100%">
              <Icon
                as={
                  expanded.has("company recipients")
                    ? ChevronUpIcon
                    : ChevronDownIcon
                }
              />
              <Text textAlign="left">Company Recipients</Text>
              {/* <Button
                size="sm"
                onClick={(event) => handleSelectDomain(event, domain)}
                >
                Select Domain
                </Button> */}
            </Grid>
          </AccordionButton>
          <AccordionPanel>
            <Accordion allowMultiple>
              {Object.entries(selected).map(([domain, domainEmails]) => {
                // if (!domainEmails) return null;
                return (
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
                            expanded.has(domain)
                              ? ChevronUpIcon
                              : ChevronDownIcon
                          }
                        />
                        <Text textAlign="left">{domain}</Text>
                        {/* <Button
                        size="sm"
                        onClick={(event) => handleSelectDomain(event, domain)}
                      >
                        Select Domain
                      </Button> */}
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
                              {/* <Box onClick={(event) => event.stopPropagation()}>
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
                            </Box> */}
                            </Flex>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            as="div"
            onClick={handleAccordionClick.bind(null, "email recipients")}
          >
            <Grid templateColumns="20px 3fr 1fr" alignItems="center" w="100%">
              <Icon
                as={
                  expanded.has("email recipients")
                    ? ChevronUpIcon
                    : ChevronDownIcon
                }
              />
              <Text textAlign="left">Email Recipients</Text>
              {/* <Button
                size="sm"
                onClick={(event) => handleSelectDomain(event, domain)}
              >
                Select Domain
              </Button> */}
            </Grid>
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList styleType="none">
              {Object.entries(selected).map(([_, domainEmails]) => {
                // if (!domainEmails) return null;
                return domainEmails
                  .map((email) => (
                    <ListItem key={email} py="1" pl="3">
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        w="100%"
                      >
                        <Text>{email}</Text>
                        {/* <Box onClick={(event) => event.stopPropagation()}>
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
                            </Box> */}
                      </Flex>
                    </ListItem>
                  ));
              })}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Selected;
