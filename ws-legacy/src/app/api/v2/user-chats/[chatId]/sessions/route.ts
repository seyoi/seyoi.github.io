import prisma from "@/common/libs/PrismaService";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { chatId } = params;
    const { workspaceId } = await req.json();

    const userChat = await prisma.endUserChat.findUnique({
      where: { id: chatId },
    });

    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId },
    });

    if (!userChat) throw new Error(`updateChatSessions: No user chat`);

    for (const member of members) {
      if (userChat.assigneeId && userChat.assigneeId === member.id) {
        await prisma.chatSession.update({
          where: {
            id: `workspaceMember-${member.id}-endUserChat-${userChat.id}`,
          },
          data: { unreadCount: { increment: 1 } },
        });
      }

      if (!userChat.assigneeId) {
        await prisma.chatSession.upsert({
          where: {
            id: `workspaceMember-${member.id}-endUserChat-${userChat.id}`,
          },
          update: { unreadCount: { increment: 1 } },
          create: {
            id: `workspaceMember-${member.id}-endUserChat-${userChat.id}`,
            personId: member.id,
            personType: "member",
            unreadCount: 1,
            readAt: new Date(),
            workspaceId,
            endUserChatId: userChat.id,
          },
        });
      }
    }
    const updatedSessions = await prisma.chatSession.findMany({
      where: { endUserChatId: userChat.id },
    });

    return new NextResponse(
      JSON.stringify({
        sessions: updatedSessions,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Update sessions: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
