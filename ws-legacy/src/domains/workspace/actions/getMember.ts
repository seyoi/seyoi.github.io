"use server";

import prisma from "@/common/libs/PrismaService";

export const getMember = async ({ memberId }: { memberId: string }) => {
  try {
    const member = await prisma.workspaceMember.findUnique({
      where: { id: memberId },
    });

    return {
      member,
    };
  } catch (err) {
    return {
      member: null,
      error: `getMember: ${err}`,
    };
  }
};
