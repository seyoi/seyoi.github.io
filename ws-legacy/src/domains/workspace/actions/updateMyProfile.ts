"use server";

import prisma from "@/common/libs/PrismaService";

export const updateMyProfile = async ({
  memberId,
  avatarUrl,
  name,
}: {
  memberId: string;
  avatarUrl: string;
  name: string;
}) => {
  try {
    const member = await prisma.workspaceMember.update({
      where: { id: memberId },
      data: {
        avatarUrl,
        name,
      },
    });

    return { member, error: null };
  } catch (err) {
    return {
      member: null,
      error: `updateMyProfile: ${err}`,
    };
  }
};
