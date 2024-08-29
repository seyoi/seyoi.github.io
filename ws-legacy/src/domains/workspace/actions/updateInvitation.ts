"use server";

import prisma from "@/common/libs/PrismaService";
import { v4 as uuid } from "uuid";

export const updateInvitation = async ({
  invitationId,
}: {
  invitationId: string;
}) => {
  try {
    const newInvitationId = uuid();
    const tempExpiredAt = new Date();
    tempExpiredAt.setMonth(tempExpiredAt.getMonth() + 1);
    const expiredAt = tempExpiredAt;

    const newInvitation = await prisma.workspaceInvitation.update({
      where: { id: invitationId },
      data: {
        id: newInvitationId,
        expiredAt,
        url: `${process.env.NEXT_APPLICATION_URL}/invitations/${newInvitationId}`,
      },
    });

    return { invitation: newInvitation, error: null };
  } catch (err) {
    return {
      invitation: null,
      error: `updateInvitation: ${err}`,
    };
  }
};
