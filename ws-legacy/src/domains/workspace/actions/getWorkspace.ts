"use server";

import prisma from "@/common/libs/PrismaService";

export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    return {
      workspace,
    };
  } catch (err) {
    return {
      workspace: null,
      error: `getWorkspace: ${err}`,
    };
  }
};
