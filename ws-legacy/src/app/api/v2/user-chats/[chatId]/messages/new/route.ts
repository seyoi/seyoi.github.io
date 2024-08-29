import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/common/libs/PrismaService";
import type { DraftMessageFile } from "@/domains/helpdesk/types/helpdesk.type";

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { chatId } = params;
    const {
      personId,
      personType,
      workspaceId,
      plainText,
      form,
      sources,
      draftFiles,
      firstAskedAt,
    } = await req.json();

    const userChat = await prisma.endUserChat.findUnique({
      where: { id: chatId },
    });

    const newMessage = await prisma.message.create({
      data: {
        personId,
        personType,
        endUserChatId: chatId,
        workspaceId,
        plainText,
        form,
        sources,
        files: draftFiles && {
          create: draftFiles.map((file: DraftMessageFile) => ({
            ...file,
          })),
        },
      },
      include: { files: true },
    });

    const updatedUserChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: {
        currentMessageId: newMessage.id,
        firstAskedAt: userChat?.firstAskedAt || firstAskedAt,
      },
      include: { currentMessage: true },
    });

    if (personType === "user") {
      await prisma.endUser.update({
        where: { id: personId },
        data: { currentChatId: updatedUserChat.id },
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: newMessage,
        userChat: updatedUserChat,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Create New Message: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
