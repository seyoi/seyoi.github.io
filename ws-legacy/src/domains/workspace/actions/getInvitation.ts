import prisma from "@/common/libs/PrismaService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const getInvitation = async ({
  invitationId,
}: {
  invitationId: string;
}) => {
  try {
    const session = await nextAuthService.getSession();

    const invitation = await prisma.workspaceInvitation.findUnique({
      where: { id: invitationId },
    });

    const workspace = await prisma.workspace.findUnique({
      where: { id: invitation?.workspaceId },
    });

    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      include: { joinedWorkspaceMemberships: true },
    });

    const member = user?.joinedWorkspaceMemberships.find(
      (membership) => membership.workspaceId === workspace?.id,
    );

    return {
      invitation,
      workspace,
      member,
    };
  } catch (err) {
    return {
      invitation: null,
      workspace: null,
      member: null,
      error: `getInvitation: ${err}`,
    };
  }
};
