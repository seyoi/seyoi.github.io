"use server";

import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { firebaseService } from "@/common/libs/FirebaseService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const joinWorkspace = async ({
  invitationId,
  workspaceId,
}: {
  invitationId: string;
  workspaceId: string;
}) => {
  try {
    const session = await nextAuthService.getSession();
    if (!session)
      redirect(`/get-started?redirectTo=/invitations/${invitationId}`);

    const roles = await prisma.workspaceRole.findMany({
      where: { workspaceId },
    });

    const operatorRole = roles.find((role) => role.name === "Operator");

    const avatarUrl = firebaseService.getRandomAvatar();
    const member = await prisma.workspaceMember.create({
      data: {
        avatarUrl,
        name: session.user.name || session.user.email || "",
        email: session.user.email || "",
        userId: session.user.id,
        workspaceId,
        roleId: operatorRole?.id as string,
      },
    });

    const userChats = await prisma.endUserChat.findMany({
      where: { workspaceId },
    });

    for (const userChat of userChats) {
      await prisma.chatSession.create({
        data: {
          id: `workspaceMember-${member.id}-endUserChat-${userChat.id}`,
          personId: member.id,
          personType: "member",
          unreadCount: 0,
          readAt: new Date(),
          workspaceId,
          endUserChatId: userChat.id,
        },
      });
    }

    return {
      error: null,
    };
  } catch (err) {
    return {
      error: `joinWorkspace: ${err}`,
    };
  }
};
