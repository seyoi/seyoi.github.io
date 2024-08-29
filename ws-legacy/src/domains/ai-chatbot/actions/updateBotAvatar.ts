"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const updateBotAvatar = async ({
  workspaceId,
  botId,
  plugInId,
  avatarUrl,
  coverImageUrl,
}: {
  workspaceId: string;
  botId: string;
  plugInId: string;
  avatarUrl: string;
  coverImageUrl: string | null;
}) => {
  try {
    const session = await nextAuthService.getSession();
    if (!session)
      redirect(
        `/workspace/${workspaceId}/ai-chatbots/${botId}/settings/profile`,
      );

    const [updatedBot, updatedPlugIn] = await Promise.all([
      prisma.workspaceBot.update({
        where: { id: botId },
        data: {
          avatarUrl,
        },
      }),
      prisma.workspacePlugIn.update({
        where: { id: plugInId },
        data: {
          coverImageUrl,
        },
      }),
    ]);

    revalidatePath(
      `/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/profile`,
    );

    return { bot: updatedBot, plugIn: updatedPlugIn, error: null };
  } catch (err) {
    return {
      bot: null,
      error: `updateBotAvatar: ${err}`,
    };
  }
};
