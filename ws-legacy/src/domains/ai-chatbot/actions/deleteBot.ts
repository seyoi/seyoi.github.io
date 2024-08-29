"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";

export const deleteBot = async ({
  botId,
  workspaceId,
}: {
  botId: string;
  workspaceId: string;
}) => {
  await prisma.workspaceBot.update({
    where: { id: botId },
    data: { deletedAt: new Date() },
  });

  revalidatePath(`/workspaces/${workspaceId}/ai-chatbots`);
  redirect(`/workspaces/${workspaceId}/ai-chatbots`);
};
