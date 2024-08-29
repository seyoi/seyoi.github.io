import prisma from "@/common/libs/PrismaService";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;
    const { email } = await req.json();

    const updatedEndUser = await prisma.endUser.update({
      where: { id: userId },
      data: {
        name: email,
        email,
      },
    });

    return new NextResponse(
      JSON.stringify({
        endUser: updatedEndUser,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Update EndUser: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
