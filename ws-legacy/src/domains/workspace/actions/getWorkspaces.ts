import { nextAuthService } from "@/common/libs/NextAuthService";
import prisma from "@/common/libs/PrismaService";

export const getWorkspaces = async () => {
  try {
    const session = await nextAuthService.getSession();
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: session?.user.id },
      include: {
        joinedWorkspaceMemberships: {
          include: { workspace: { include: { members: true } } },
        },
      },
    });

    const workspaces = user.joinedWorkspaceMemberships
      .map((membership) => membership.workspace)
      .filter((workspace) => !workspace.deletedAt);

    return {
      workspaces,
      members: [],
    };
  } catch (err) {
    return {
      workspaces: [],
      members: [],
      error: `getWorkspaces: ${err}`,
    };
  }
};
