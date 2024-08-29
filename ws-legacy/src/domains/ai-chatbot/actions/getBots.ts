import prisma from "@/common/libs/PrismaService";

export const getBots = async ({ workspaceId }: { workspaceId: string }) => {
  try {
    const bots = await prisma.workspaceBot.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { updatedAt: "desc" },
    });

    return {
      bots,
    };
  } catch (err) {
    return {
      bots: [],
      error: `getBots: ${err}`,
    };
  }
};
