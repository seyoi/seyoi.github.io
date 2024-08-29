import {
  Prisma,
  type EndUserChat as TEndUserChat,
  type EndUser as TEndUser,
  type ChatSession as TChatSession,
  type MessageFile as TMessageFile,
} from "@prisma/client";

const message = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: { files: true, followUpForm: true },
});

export type HelpdeskSidebarMenu = {
  key: string;
  label: string;
  icon?: JSX.Element;
  image?: string;
  subMenus?: HelpdeskSidebarMenu[];
};

export type UserChatFilterMenu = {
  sort: { key: string; label: string };
  tab: { key: string; label: string };
  search: string;
};

export type UserChat = TEndUserChat;
export type Message = Prisma.MessageGetPayload<typeof message>;
export type EndUser = TEndUser;
export type Session = TChatSession;
export type MessageFile = TMessageFile;
export type DraftMessageFile = Omit<
  MessageFile,
  "id" | "bucketName" | "messageId"
>;

export type SendEmailNotiType = {
  workspaceName: string;
  workspaceId: string;
  to: string;
  memberName: string;
  message: string;
  veilId: string;
  plugInId: string;
};
