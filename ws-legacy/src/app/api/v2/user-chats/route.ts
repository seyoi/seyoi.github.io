import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/common/libs/PrismaService";
import { type WorkspaceBot, type WorkspaceMember } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get("X-User-Id");
    const searchParams = req.nextUrl.searchParams;
    const displayChatDuration = searchParams.get("displayChatDuration");

    if (!userId)
      return new NextResponse(
        JSON.stringify({ message: `Get userChats: No Authorize` }),
        {
          status: 401,
        },
      );

    let userChats = await prisma.endUserChat.findMany({
      where: { endUserId: userId, NOT: { state: "closed" } },
      include: {
        currentMessage: { include: { files: true } },
      },
    });

    const numberedDisplayChatDuration = displayChatDuration
      ? Number(displayChatDuration)
      : 0;

    if (numberedDisplayChatDuration !== 0) {
      const currentDate = new Date();
      const cutoffDate = new Date();
      cutoffDate.setDate(currentDate.getDate() - numberedDisplayChatDuration);

      userChats = userChats.filter(
        (chat) => (chat.currentMessage?.createdAt || cutoffDate) >= cutoffDate,
      );
    }

    const members: WorkspaceMember[] = [];
    const bots: WorkspaceBot[] = [];

    for (const userChat of userChats) {
      const personType = userChat.currentMessage?.personType;
      const personId = userChat.currentMessage?.personId;

      if (personType === "member") {
        if (members.find((member) => member.id === personId)) continue;

        const member = await prisma.workspaceMember.findUnique({
          where: { id: personId },
        });

        if (member) members.push(member);
      }

      if (personType === "bot") {
        if (bots.find((bot) => bot.id === personId)) continue;

        const bot = await prisma.workspaceBot.findUnique({
          where: { id: personId },
        });

        if (bot) bots.push(bot);
      }
    }

    return new NextResponse(
      JSON.stringify({
        userChats: userChats.sort(
          (a, b) =>
            new Date(b.currentMessage?.createdAt as Date).getTime() -
            new Date(a.currentMessage?.createdAt as Date).getTime(),
        ),
        members: members.map((member) => ({ ...member, name: "상담원" })),
        bots,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Get userChats: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
