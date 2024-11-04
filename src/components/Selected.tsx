import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  UnorderedList,
} from "@chakra-ui/react";

import { useSelectedLogic } from "../hooks/useSelectedLogic";
import DomainAccordionItem from "./components/DomainAccordionItem";
import CustomAccordionButton from "./components/CustomAccordionButton";
import UnorderedListItem from "./components/UnorderedListItem";
import CustomGridItem from "./components/CustomGridItem";

interface SelectedProps {
  borderText: string;
}

const Selected: React.FC<SelectedProps> = ({ borderText }) => {
  const {
    context: { selected },
    state: { expanded },
    handlers: { handleAccordionClick, handleSelectDomain, handleSelectEmail },
  } = useSelectedLogic();

  return (
    <CustomGridItem {...{ borderText }}>
      <Accordion allowMultiple>
        <AccordionItem>
          <CustomAccordionButton
            {...{
              data: { domain: "company recipients" },
              state: { expanded: expanded.has("company recipients") },
              handlers: { handleAccordionClick },
            }}
          />
          <AccordionPanel>
            <Accordion allowMultiple>
              {Object.entries(selected).map(([domain, domainEmails]) => (
                <DomainAccordionItem
                  {...{
                    data: {
                      domain,
                      domainEmails,
                      buttonLabel: "Deselect",
                    },
                    state: { expanded },
                    handlers: {
                      handleAccordionClick,
                      handleSelectDomain,
                      handleSelectEmail,
                    },
                  }}
                />
              ))}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <CustomAccordionButton
            {...{
              data: { domain: "email recipients" },
              state: { expanded: expanded.has("email recipients") },
              handlers: { handleAccordionClick },
            }}
          />
          <AccordionPanel>
            <UnorderedList styleType="none">
              {Object.entries(selected).map(([domain, domainEmails]) =>
                domainEmails.map((email, emailIndex) => (
                  <UnorderedListItem
                    {...{
                      data: {
                        label: "Deselect",
                        domain,
                        email,
                        emailIndex,
                      },
                      handlers: { handleSelectEmail },
                    }}
                  />
                ))
              )}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </CustomGridItem>
  );
};

export default Selected;
