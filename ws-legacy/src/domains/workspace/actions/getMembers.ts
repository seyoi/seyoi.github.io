"use server";

import prisma from "@/common/libs/PrismaService";

export const getMembers = async ({ workspaceId }: { workspaceId: string }) => {
  try {
    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId },
    });

    return {
      members,
    };
  } catch (err) {
    return {
      members: [],
      error: `getMembers: ${err}`,
    };
  }
};
