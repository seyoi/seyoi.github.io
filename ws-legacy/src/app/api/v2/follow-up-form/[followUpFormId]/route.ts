import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/common/libs/PrismaService";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { followUpFormId: string } },
) {
  try {
    const { followUpFormId } = params;
    const { email, submittedAt } = await req.json();

    const updatedFollowUpForm = await prisma.followUpForm.update({
      where: { id: followUpFormId },
      data: {
        email,
        submittedAt,
      },
      include: { message: { include: { followUpForm: true } } },
    });

    return new NextResponse(
      JSON.stringify({
        message: updatedFollowUpForm.message,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Update Follow Up Form: ${error}`,
      }),
      {
        status: 500,
      },
    );
  }
}
