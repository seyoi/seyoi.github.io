"use server";

import prisma from "@/common/libs/PrismaService";

export const updateWorkspace = async ({
  workspaceId,
  avatarUrl,
  name,
  welcomeMessage,
}: {
  workspaceId: string;
  avatarUrl: string;
  name: string;
  welcomeMessage: string;
}) => {
  try {
    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        avatarUrl,
        name,
        welcomeMessage,
      },
    });

    return { workspace, error: null };
  } catch (err) {
    return {
      workspace: null,
      error: `updateWorkspace: ${err}`,
    };
  }
};
