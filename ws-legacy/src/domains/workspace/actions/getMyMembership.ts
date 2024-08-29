"use server";

import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const getMyMembership = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const session = await nextAuthService.getSession();
    if (!session)
      redirect(
        `/get-started?redirectTo=/workspaces/${workspaceId}/help-desk/user-chats/all`,
      );

    const myMembership = await prisma.workspaceMember.findUnique({
      where: { userId_workspaceId: { userId: session.user.id, workspaceId } },
    });

    return {
      myMembership,
    };
  } catch (err) {
    return {
      myMembership: null,
      error: `getMyMembership: ${err}`,
    };
  }
};
