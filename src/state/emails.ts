import * as React from "react";
import { IEmailsContext, IEmailsState } from "../types/emailTypes";

export const InitialState: IEmailsState = {
  available: {},
  selected: {},
};

export const EmailsContext = React.createContext<IEmailsContext | undefined>(undefined);
