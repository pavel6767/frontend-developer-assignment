import { GroupedByDomain } from "../types/emailTypes";

export const groupEmailsByDomain = (emails: string[]): GroupedByDomain =>
  emails.reduce((res, email) => {
    const domain = email.split("@")[1];
    if (!res[domain]) res[domain] = [];
    res[domain].push(email);
    return res;
  }, {});
