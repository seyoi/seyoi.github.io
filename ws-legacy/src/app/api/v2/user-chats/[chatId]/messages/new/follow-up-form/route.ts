import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/common/libs/PrismaService";

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { chatId } = params;
    const { personId, personType, workspaceId } = await req.json();

    const newMessage = await prisma.message.create({
      data: {
        personId,
        personType,
        plainText:
          "이메일을 남겨주세요. 오프라인 상태가 되시면 이메일로 답변 알림을 보내드립니다.\n\n(수집된 개인정보는 문의 접수, 고객 불편 사항 확인 및 처리 결과 회신에 이용되며 3년간 보관됩니다.)",
        followUpForm: {
          create: {
            email: "",
          },
        },
        endUserChatId: chatId,
        workspaceId,
      },
      include: { followUpForm: true },
    });

    const updatedUserChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: {
        currentMessageId: newMessage.id,
        hasFollowUpForm: true,
      },
      include: { currentMessage: true },
    });

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
      JSON.stringify({
        message: `Create New Message Follow Up Form: ${error}`,
      }),
      {
        status: 500,
      },
    );
  }
}
