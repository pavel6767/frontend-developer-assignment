import React from "react";
import { AccordionButton, Button, Icon, Grid, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface IDataProps {
  domain: string;
  buttonLabel?: string;
}

interface IStateProps {
  expanded: boolean;
}
interface IHandlersProps {
  handleAccordionClick: Function;
  handleSelectDomain?: Function;
}

interface CustomAccordionButtonProps {
  data: IDataProps;
  state: IStateProps;
  handlers: IHandlersProps;
}

const CustomAccordionButton: React.FC<CustomAccordionButtonProps> = ({
  data: { domain, buttonLabel },
  state: { expanded },
  handlers: { handleAccordionClick, handleSelectDomain },
}) => (
  <AccordionButton as="div" onClick={handleAccordionClick.bind(null, domain)}>
    <Grid templateColumns="20px 3fr 1fr" alignItems="center" w="100%">
      <Icon as={expanded ? ChevronUpIcon : ChevronDownIcon} />
      <Text textAlign="left">{domain}</Text>
      {handleSelectDomain && (
        <Button
          size="sm"
          onClick={(event) => handleSelectDomain(event, domain)}
        >
          {buttonLabel} Domain
        </Button>
      )}
    </Grid>
  </AccordionButton>
);

export default CustomAccordionButton;
