import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/common/libs/PrismaService";
import { WorkspaceBot, WorkspaceMember } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const headersList = headers();
    const userId = headersList.get("X-User-Id");
    const chatId = params.chatId;

    const userChat = await prisma.endUserChat.findUniqueOrThrow({
      where: { id: chatId, NOT: { state: "closed" } },
      include: { currentMessage: { include: { files: true } } },
    });

    if (userChat.endUserId !== userId)
      return new NextResponse(
        JSON.stringify({ message: `Get userChat: No Authorize` }),
        {
          status: 401,
        },
      );

    const members: WorkspaceMember[] = [];
    const bots: WorkspaceBot[] = [];

    const personType = userChat.currentMessage?.personType;
    const personId = userChat.currentMessage?.personId;

    if (personType === "member") {
      const member = await prisma.workspaceMember.findUnique({
        where: { id: personId },
      });

      if (member) members.push(member);
    }

    if (personType === "bot") {
      const bot = await prisma.workspaceBot.findUnique({
        where: { id: personId },
      });

      if (bot) bots.push(bot);
    }

    return new NextResponse(
      JSON.stringify({
        userChat,
        bots,
        members: members.map((member) => ({ ...member, name: "상담원" })),
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Get userChat: ${error}` }),
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const chatId = params.chatId;

    const { isAIBotOn } = await req.json();

    const userChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: { isAIBotOn },
    });

    return new NextResponse(
      JSON.stringify({
        userChat,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Get userChat: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
