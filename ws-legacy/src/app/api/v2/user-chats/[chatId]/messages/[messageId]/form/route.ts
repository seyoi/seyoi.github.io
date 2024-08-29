import prisma from "@/common/libs/PrismaService";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { messageId: string } },
) {
  try {
    const { messageId } = params;
    const { form } = await req.json();

    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        form,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: updatedMessage,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Update message: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
