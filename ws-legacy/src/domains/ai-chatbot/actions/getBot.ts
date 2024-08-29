import prisma from "@/common/libs/PrismaService";

export const getBot = async ({ botId }: { botId: string }) => {
  try {
    const bot = await prisma.workspaceBot.findUnique({
      where: { id: botId },
    });

    const plugIn = await prisma.workspacePlugIn.findUnique({
      where: { id: bot?.plugInId || "" },
    });

    return {
      bot,
      plugIn,
    };
  } catch (err) {
    return {
      bot: null,
      plugIn: null,
      error: `getBot: ${err}`,
    };
  }
};
