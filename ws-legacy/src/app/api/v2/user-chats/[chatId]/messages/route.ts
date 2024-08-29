import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/common/libs/PrismaService";
import { type WorkspaceBot, type WorkspaceMember } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const headersList = headers();
    const userId = headersList.get("X-User-Id");
    const chatId = params.chatId;

    const userChat = await prisma.endUserChat.findUniqueOrThrow({
      where: { id: chatId },
      include: { currentMessage: true },
    });

    if (userChat.endUserId !== userId)
      return new NextResponse(
        JSON.stringify({ message: `Get messages: No Authorize` }),
        {
          status: 401,
        },
      );

    let messages = await prisma.message.findMany({
      where: {
        endUserChatId: chatId,
      },
      orderBy: { createdAt: "asc" },
      include: { files: true, followUpForm: true },
    });

    messages = messages.filter(
      (message) => !message.options.includes("private"),
    );

    const members: WorkspaceMember[] = [];
    const bots: WorkspaceBot[] = [];

    for (const message of messages) {
      const personType = message.personType;
      const personId = message.personId;

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
        messages,
        members: members.map((member) => ({ ...member, name: "상담원" })),
        bots,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Get messages: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
