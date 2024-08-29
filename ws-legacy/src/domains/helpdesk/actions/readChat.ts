"use server";

import prisma from "@/common/libs/PrismaService";

export const readChat = async ({
  memberId,
  workspaceId,
  chatId,
}: {
  memberId: string;
  workspaceId: string;
  chatId: string;
}) => {
  try {
    await prisma.chatSession.upsert({
      where: {
        id: `workspaceMember-${memberId}-endUserChat-${chatId}`,
      },
      update: { unreadCount: 0 },
      create: {
        id: `workspaceMember-${memberId}-endUserChat-${chatId}`,
        personId: memberId,
        personType: "member",
        unreadCount: 0,
        readAt: new Date(),
        workspaceId,
        endUserChatId: chatId,
      },
    });

    const session = await prisma.chatSession.findUnique({
      where: {
        id: `workspaceMember-${memberId}-endUserChat-${chatId}`,
      },
    });

    return { session };
  } catch (error) {
    error;
    return { session: null, error: `readChat: ${error}` };
  }
};
