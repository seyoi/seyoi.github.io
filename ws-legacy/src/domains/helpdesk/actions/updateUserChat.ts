"use server";

import prisma from "@/common/libs/PrismaService";

export const updateUserChat = async ({
  chatId,
  isAIBotOn,
}: {
  chatId: string;
  isAIBotOn: boolean;
}) => {
  try {
    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { isAIBotOn },
    });

    return {
      userChat,
    };
  } catch (error) {
    return {
      userChat: null,
      error: `toggleAIBot: ${error}`,
    };
  }
};
