import React, { useContext, useEffect, useState } from "react";
import { EmailsContext } from "../state/emails";
import { isValidEmail } from "../utils";

export const useAvailableLogic = () => {
  const {
    state: { available },
    setState,
  } = useContext(EmailsContext);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const [filteredDomains, setFilteredDomains] = useState(
    Object.keys(available).sort()
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  useEffect(() => {
    const filtered = search
      ? Object.keys(available).filter((domain) => domain.includes(search))
      : Object.keys(available);
    setFilteredDomains(filtered.sort());
    setShowAddButton(isValidEmail(search));
  }, [search, available]);

  useEffect(() => {
    setFilteredDomains((prevState) => {
      if (prevState.length === Object.keys(available).length) return prevState;

      const newState = prevState.filter((domain) => !!available[domain]);
      return newState;
    });
  }, [available]);

  // :P:: TODO: still need to sort
  // useEffect(() => {
  //   setGroupedEmails(() => groupEmailsByDomain(state.available));
  // }, [state.available]);

  const handleSelectEmail = (
    domain: string,
    email: string,
    index: number
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

  const handleAddClick = () => {
    const domain = search.split("@")[1];
    if (!available[domain]) available[domain] = [];
    available[domain].push(search);
    setSearch("");
  };

  return {
    context: { available },
    state: {
      search,
      expanded,
      showAddButton,
      filteredDomains,
    },
    handlers: {
      handleSearchChange,
      handleSelectEmail,
      handleSelectDomain,
      handleAccordionClick,
      handleAddClick,
    },
  };
};
