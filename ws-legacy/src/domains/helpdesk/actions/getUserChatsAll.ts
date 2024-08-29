"use server";

import prisma from "@/common/libs/PrismaService";
import { Message } from "../types/helpdesk.type";

export const getUserChatsAll = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const userChats = await prisma.endUserChat.findMany({
      where: { workspaceId },
      include: {
        currentMessage: { include: { files: true } },
        endUser: true,
        sessions: true,
      },
    });

    const filteredMessages = userChats.map(
      (chat) => chat.currentMessage,
    ) as Message[];

    const filteredUsers = userChats.map((chat) => chat.endUser);

    const filteredSessions = userChats.map((chat) => chat.sessions);

    return {
      userChats,
      messages: filteredMessages,
      users: filteredUsers,
      sessions: filteredSessions.flat(),
      error: null,
    };
  } catch (err) {
    return {
      userChats: [],
      messages: [],
      users: [],
      sessions: [],
      error: `getUserChatsAll: ${err}`,
    };
  }
};
