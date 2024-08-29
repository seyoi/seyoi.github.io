"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const updatePlugInButtonPosition = async ({
  workspaceId,
  botId,
  marginX,
  marginY,
}: {
  workspaceId: string;
  botId: string;
  marginX: number;
  marginY: number;
}) => {
  try {
    const session = await nextAuthService.getSession();
    if (!session)
      redirect(
        `/workspace/${workspaceId}/ai-chatbots/${botId}/settings/button`,
      );

    const bot = await prisma.workspaceBot.findUnique({
      where: { id: botId },
    });

    const updatePlugIn = await prisma.workspacePlugIn.update({
      where: { id: bot?.plugInId as string },
      data: {
        marginX,
        marginY,
      },
    });

    revalidatePath(
      `/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/button`,
    );

    return { bot, plugIn: updatePlugIn, error: null };
  } catch (err) {
    return {
      bot: null,
      plugIn: null,
      error: `updatePlugInButtonPosition: ${err}`,
    };
  }
};
