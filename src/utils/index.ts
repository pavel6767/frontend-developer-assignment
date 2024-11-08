import React from "react";
import { GroupedByDomain } from "../types/emailTypes";

export const groupEmailsByDomain = (emails: string[]): GroupedByDomain =>
  emails.reduce((res, email) => {
    const domain = email.split("@")[1];
    if (!res[domain]) res[domain] = [];
    res[domain].push(email);
    return res;
  }, {});

export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const stopPropagation = (event: React.MouseEvent) => {
  event.stopPropagation();
};

export const sortFilteredDomains = (filtered, allDomains): string[] => {
  const uniqueDomains: string[] = [];
  const groupDomains: string[] = [];
  for (const domain of filtered) {
    // if (!allDomains[domain]) continue;
    if (allDomains[domain].length === 1) {
      uniqueDomains.push(domain);
    } else {
      groupDomains.push(domain);
    }
  }
  uniqueDomains.sort();
  groupDomains.sort();
  return [...groupDomains, ...uniqueDomains];
};
