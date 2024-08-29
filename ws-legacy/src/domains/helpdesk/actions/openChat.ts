"use server";

import prisma from "@/common/libs/PrismaService";

export const openChat = async ({
  workspaceId,
  chatId,
  personId,
}: {
  workspaceId: string;
  chatId: string;
  personId: string;
}) => {
  try {
    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { state: "open" },
    });

    const message = await prisma.message.create({
      data: {
        personId,
        personType: "member",
        endUserChatId: chatId,
        workspaceId,
        log: JSON.stringify({ action: "open" }),
        options: ["private"],
      },
    });

    return {
      userChat,
      message,
    };
  } catch (error) {
    return {
      userChat: null,
      message: null,
      error: `openChat: ${error}`,
    };
  }
};
