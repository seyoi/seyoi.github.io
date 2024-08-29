"use server";

import prisma from "@/common/libs/PrismaService";
import { v4 as uuid } from "uuid";

export const addNote = async ({
  chatId,
  memberId,
  text,
}: {
  workspaceId: string;
  chatId: string;
  memberId: string;
  text: string;
}) => {
  try {
    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: {
        notes: {
          push: JSON.stringify({
            id: uuid(),
            memberId,
            text,
            submittedAt: new Date(),
          }),
        },
      },
    });

    return {
      userChat,
    };
  } catch (error) {
    return {
      userChat: null,
      error: `addNote: ${error}`,
    };
  }
};
