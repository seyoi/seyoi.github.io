"use server";

import prisma from "@/common/libs/PrismaService";

export const removeFollower = async ({
  chatId,
  followerIds,
}: {
  chatId: string;
  followerIds: string[];
}) => {
  try {
    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { followerIds },
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
      sessions: [],
      error: `removeFollower: ${error}`,
    };
  }
};
