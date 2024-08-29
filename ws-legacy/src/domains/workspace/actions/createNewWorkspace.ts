"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/common/libs/PrismaService";
import { firebaseService } from "@/common/libs/FirebaseService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const createNewWorkspace = async (workspaceName: string) => {
  try {
    const user = await nextAuthService.getUser();
    const avatarUrl = firebaseService.getRandomAvatar();

    const newWorkspace = await prisma.workspace.create({
      data: {
        avatarUrl,
        name: workspaceName,
        welcomeMessage: "안녕하세요. 무엇을 도와드릴까요?",
      },
    });

    const ownerRole = await prisma.workspaceRole.create({
      data: {
        name: "Owner",
        workspaceId: newWorkspace.id,
      },
    });

    await prisma.workspaceRole.create({
      data: {
        name: "Operator",
        workspaceId: newWorkspace.id,
      },
    });

    await prisma.workspaceMember.create({
      data: {
        avatarUrl,
        name: user?.name || user?.email || "랜덤 멤버",
        email: user?.email || "no email",
        userId: user?.id as string,
        workspaceId: newWorkspace.id,
        roleId: ownerRole.id,
      },
    });

    revalidatePath("/workspaces");

    return { workspace: newWorkspace, error: null };
  } catch (err) {
    return {
      workspace: null,
      error: `createNewWorkspace: ${err}`,
    };
  }
};
