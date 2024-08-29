"use server";

import prisma from "@/common/libs/PrismaService";
import type { DraftMessageFile } from "../types/helpdesk.type";

export const createMessage = async ({
  personId,
  personType,
  plainText,
  form,
  workspaceId,
  chatId,
  draftFiles,
}: {
  personId: string;
  personType: string;
  plainText?: string;
  form?: string;
  workspaceId: string;
  chatId: string;
  draftFiles?: DraftMessageFile[];
}) => {
  try {
    const message = await prisma.message.create({
      data: {
        personId,
        personType,
        plainText,
        form,
        files: draftFiles && {
          create: draftFiles.map((file: DraftMessageFile) => ({
            ...file,
          })),
        },
        workspaceId,
        endUserChatId: chatId,
      },
      include: { files: true },
    });

    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { currentMessageId: message.id },
    });

    return {
      message,
      userChat,
    };
  } catch (error) {
    return {
      message: null,
      userChat: null,
      error: `createMessage: ${error}`,
    };
  }
};
