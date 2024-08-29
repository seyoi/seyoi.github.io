"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/common/libs/PrismaService";

export const deleteWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: { deletedAt: new Date() },
    });
  } catch (err) {
    return { error: `${err}` };
  }

  revalidatePath("/workspaces");
  redirect("/workspaces");
};
