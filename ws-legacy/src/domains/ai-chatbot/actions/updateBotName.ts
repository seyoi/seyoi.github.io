"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { nextAuthService } from "@/common/libs/NextAuthService";

export const updateBotName = async ({
  workspaceId,
  botId,
  name,
  welcomeMessage,
}: {
  workspaceId: string;
  botId: string;
  name: string;
  welcomeMessage: string;
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
        name,
        welcomeMessage,
      },
    });

    revalidatePath(
      `/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/profile`,
    );

    return { bot: updatedBot, error: null };
  } catch (err) {
    return {
      bot: null,
      error: `updateBotName: ${err}`,
    };
  }
};
