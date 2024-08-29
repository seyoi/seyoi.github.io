"use server";

import prisma from "@/common/libs/PrismaService";

export const editMessage = async ({
  id,
  plainText,
}: {
  id: string;
  plainText: string;
}) => {
  try {
    const message = await prisma.message.update({
      where: { id },
      data: {
        plainText,
      },
    });

    return {
      message,
    };
  } catch (error) {
    return {
      message: null,
      error: `editMessage: ${error}`,
    };
  }
};
