let Prisma: typeof import("@prisma/client");

// botClsUid => botId
async function main() {
  Prisma = await import("@prisma/client");
  const PrismaClient = Prisma.PrismaClient;
  const prisma = new PrismaClient();

  const allBots = await prisma.workspaceBot.findMany();
  const findMessages = await prisma.message.findMany({
    where: { personType: "bot" },
  });
  const y: {
    id: string;
    avatarUrl: string;
    name: string;
    welcomeMessage: string | null;
    botClsUid: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    workspaceId: string;
    plugInId: string | null;
  }[] = [];
  findMessages.map((message) => {
    const findBot = allBots.find((bot) => bot.id === message.personId);
    if (findBot) {
      y.push(findBot);
      return { ...message, personId: findBot.botClsUid };
    }
    return message;
  });
  console.log(y);
  // const newAllBots = allBots.map((bot) => ({ ...bot, id: bot.botClsUid }));

  // console.log(newAllBots);
}

main()
  .catch((e) => console.log(e))
  .finally(() => {
    const PrismaClient = Prisma.PrismaClient;
    const prisma = new PrismaClient();
    prisma.$disconnect;
  });
