import React from "react";
import {
  Accordion,
  Button,
  UnorderedList,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useAvailableLogic } from "../hooks/useAvailableLogic";
import DomainAccordionItem from "./components/DomainAccordionItem";
import UnorderedListItem from "./components/UnorderedListItem";
import CustomGridItem from "./components/CustomGridItem";
import { sortFilteredDomains } from "../utils";

interface AvailableProps {
  borderText: string;
}

const Available: React.FC<AvailableProps> = ({ borderText }) => {
  const {
    context: { available },
    state: { search, expanded, showAddButton, filteredDomains },
    handlers: {
      handleSearchChange,
      handleSelectEmail,
      handleSelectDomain,
      handleAccordionClick,
      handleAddClick,
    },
  } = useAvailableLogic();

  return (
    <CustomGridItem {...{ borderText }}>
      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          type="email"
        />
        {showAddButton && (
          <Button ml="3" onClick={handleAddClick}>
            Add
          </Button>
        )}
      </InputGroup>

      <Accordion allowMultiple>
        {sortFilteredDomains(filteredDomains, available).map((domain) => {
          const domainEmails = available[domain];
          if (!domainEmails) return null;
          return domainEmails.length > 1 ? (
            <DomainAccordionItem
              {...{
                data: { domain, domainEmails, buttonLabel: "Select" },
                state: { expanded },
                handlers: {
                  handleAccordionClick,
                  handleSelectDomain,
                  handleSelectEmail,
                },
              }}
            />
          ) : (
            <UnorderedList key={domain} styleType="none">
              <UnorderedListItem
                {...{
                  data: {
                    label: "Select",
                    domain,
                    email: domainEmails[0],
                    emailIndex: 0,
                  },
                  handlers: { handleSelectEmail },
                }}
              />
            </UnorderedList>
          );
        })}
      </Accordion>
    </CustomGridItem>
  );
};

export default Available;
