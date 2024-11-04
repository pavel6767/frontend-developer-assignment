export interface IRecipients {
  email: string;
  isSelected: boolean;
}

export interface EmailGroup {
  domain: string;
  emails: string[];
}

export type GroupedByDomain = Record<string, string[]>;

export interface IEmailsState {
  available: GroupedByDomain;
  selected: GroupedByDomain;
}

export interface IEmailsContext {
  state: IEmailsState;
  setState: React.Dispatch<React.SetStateAction<IEmailsState>>;
}
