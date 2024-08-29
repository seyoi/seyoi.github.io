"use server";

import prisma from "@/common/libs/PrismaService";

export const addAssignee = async ({
  workspaceId,
  chatId,
  assigneeId,
}: {
  workspaceId: string;
  chatId: string;
  assigneeId: string;
}) => {
  try {
    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId },
    });

    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { assigneeId },
      include: { currentMessage: true, endUser: true },
    });

    const message = userChat.currentMessage;

    const user = userChat.endUser;

    for (const member of members) {
      if (userChat.assigneeId && userChat.assigneeId !== member.id) {
        await prisma.chatSession.update({
          where: {
            id: `workspaceMember-${member.id}-endUserChat-${userChat.id}`,
          },
          data: { unreadCount: 0 },
        });
      }
    }

    const sessions = await prisma.chatSession.findMany({
      where: { endUserChatId: userChat.id },
    });

    return {
      userChat,
      message,
      user,
      sessions,
    };
  } catch (error) {
    return {
      userChat: null,
      message: null,
      user: null,
      sessions: [],
      error: `addAssignee: ${error}`,
    };
  }
};
