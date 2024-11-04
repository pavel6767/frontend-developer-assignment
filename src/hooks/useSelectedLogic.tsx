import React, { useContext, useState } from "react";
import { EmailsContext } from "../state/emails";

export const useSelectedLogic = () => {
  const {
    state: { selected },
    setState,
  } = useContext(EmailsContext);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const handleAccordionClick = (domain: string) => {
    setExpanded((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(domain)) newState.delete(domain);
      else newState.add(domain);
      return newState;
    });
  };

  const handleSelectDomain = (event: React.MouseEvent, domain: string) => {
    event.stopPropagation();
    setState((prevState) => {
      const newState = structuredClone(prevState);

      if (!newState.available[domain]) newState.available[domain] = [];
      newState.available[domain].push(...newState.selected[domain]);
      newState.available[domain].sort();

      delete newState.selected[domain];
      return newState;
    });
  };

  const handleSelectEmail = (
    domain: string,
    email: string,
    index: number = 0
  ) => {
    setState((prevState) => {
      const newState = structuredClone(prevState);

      if (!newState.available[domain]) newState.available[domain] = [];
      newState.available[domain].push(email);
      newState.available[domain].sort();

      newState.selected[domain].splice(index, 1);
      if (!newState.selected[domain].length) delete newState.selected[domain];

      return newState;
    });
  };
  return {
    context: { selected },
    state: { expanded },
    handlers: {
      handleAccordionClick,
      handleSelectDomain,
      handleSelectEmail,
    },
  };
};
