"use server";

import prisma from "@/common/libs/PrismaService";

export const getUserChat = async ({ chatId }: { chatId: string }) => {
  try {
    const userChat = await prisma.endUserChat.findUnique({
      where: { id: chatId },
    });

    const user = await prisma.endUser.findUnique({
      where: { id: userChat?.endUserId },
    });

    return {
      userChat,
      user,
      error: null,
    };
  } catch (err) {
    return {
      userChat: null,
      user: null,
      error: `getUserChat: ${err}`,
    };
  }
};
