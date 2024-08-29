"use server";

import prisma from "@/common/libs/PrismaService";

export const removeAssignee = async ({ chatId }: { chatId: string }) => {
  try {
    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { assigneeId: null },
      include: { currentMessage: true, endUser: true },
    });

    const message = userChat.currentMessage;

    const user = userChat.endUser;

    return {
      userChat,
      message,
      user,
    };
  } catch (error) {
    return {
      userChat: null,
      message: null,
      user: null,
      error: `removeAssignee: ${error}`,
    };
  }
};
