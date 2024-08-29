export type ButtonInMessage = {
  type: string;
  label: string;
  url: string;
};

export type FormInMessage = {
  type: string; // custom, followUp
  inputs: { type: string; label: string; options?: string[]; value: string }[];
  submittedAt: Date | null;
};

export type SourceInMessage = {
  title: string | null;
  itemKey: string;
  itemUid: string;
};

export type LogInMessage = { action: string };

export type UserChatNote = {
  id: string;
  text: string;
  memberId: string;
  submittedAt: Date | null;
};
