export interface IRecipients {
  email: string;
  isSelected: boolean;
}

export interface EmailGroup {
  domain: string;
  emails: string[];
}

export interface IEmailsState {
  available: string[];
  selected: string[];
}

export interface IEmailsContext {
  state: IEmailsState;
  setState: React.Dispatch<React.SetStateAction<IEmailsState>>;
}