"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const updatePlugInThemeColor = async ({
  workspaceId,
  botId,
  themeColor,
}: {
  workspaceId: string;
  botId: string;
  themeColor: string;
}) => {
  try {
    const session = await nextAuthService.getSession();
    if (!session)
      redirect(
        `/workspace/${workspaceId}/ai-chatbots/${botId}/settings/profile`,
      );

    const updatedBot = await prisma.workspaceBot.update({
      where: { id: botId },
      data: {
        plugIn: {
          update: {
            themeColor,
          },
        },
      },
    });

    const updatedPlugIn = await prisma.workspacePlugIn.findUnique({
      where: { id: updatedBot.plugInId as string },
    });

    revalidatePath(
      `/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/profile`,
    );

    return { bot: updatedBot, plugIn: updatedPlugIn, error: null };
  } catch (err) {
    return {
      bot: null,
      plugIn: null,
      error: `updatePlugInThemeColor: ${err}`,
    };
  }
};
