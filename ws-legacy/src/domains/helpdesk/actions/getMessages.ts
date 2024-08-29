"use server";

import prisma from "@/common/libs/PrismaService";
import { WorkspaceBot } from "@prisma/client";

export const getMessages = async ({ chatId }: { chatId: string }) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        endUserChatId: chatId,
      },
      include: { files: true, followUpForm: true },
    });

    const bots: WorkspaceBot[] = [];

    for (const message of messages) {
      const personType = message.personType;
      const personId = message.personId;

      if (personType === "bot") {
        if (bots.find((bot) => bot.id === personId)) continue;

        const bot = await prisma.workspaceBot.findUnique({
          where: { id: personId },
        });

        if (bot) bots.push(bot);
      }
    }
    return {
      messages,
      bots,
      error: null,
    };
  } catch (err) {
    return {
      messages: [],
      bots: [],
      error: `getMessages: ${err}`,
    };
  }
};
