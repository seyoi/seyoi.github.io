"use server";

import prisma from "@/common/libs/PrismaService";
import { v4 as uuid } from "uuid";

export const getInvitationByWorkspaceId = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const newInvitationId = uuid();
    const tempExpiredAt = new Date();
    tempExpiredAt.setMonth(tempExpiredAt.getMonth() + 1);
    const expiredAt = tempExpiredAt;

    const invitation =
      (await prisma.workspaceInvitation.findUnique({
        where: { workspaceId },
      })) ||
      (await prisma.workspaceInvitation.create({
        data: {
          id: newInvitationId,
          expiredAt,
          url: `${process.env.NEXT_APPLICATION_URL}/invitations/${newInvitationId}`,
          workspaceId,
        },
      }));

    return {
      invitation,
    };
  } catch (err) {
    return {
      invitation: null,
      error: `getInvitationByWorkspaceId: ${err}`,
    };
  }
};
