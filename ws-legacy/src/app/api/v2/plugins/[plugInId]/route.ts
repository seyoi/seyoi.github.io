import prisma from "@/common/libs/PrismaService";
import { NextResponse, type NextRequest } from "next/server";
import { firebaseService } from "@/common/libs/FirebaseService";
import { nextAuthService } from "@/common/libs/NextAuthService";
import { generateRandomFruitName } from "@/common/utils/generateRandomFruitName";

export async function POST(
  req: NextRequest,
  { params }: { params: { plugInId: string } },
) {
  try {
    const plugInId = params.plugInId;

    const { veilId } = await req.json();

    const plugIn = await prisma.workspacePlugIn.findUniqueOrThrow({
      where: { id: plugInId },
      include: { workspace: true, bot: true },
    });

    const workspace = plugIn.workspace;

    const bot = plugIn.bot;

    const getMember = async () => {
      const findSessionUser = await nextAuthService.getUser();

      if (!findSessionUser) return;

      return await prisma.workspaceMember.findUnique({
        where: {
          userId_workspaceId: {
            userId: findSessionUser.id,
            workspaceId: workspace.id,
          },
        },
      });
    };

    const createNewUser = async () => {
      const name = generateRandomFruitName();
      const avatarUrl = firebaseService.getRandomAvatar();

      const findMember = await getMember();

      if (findMember) {
        return await prisma.endUser.create({
          data: {
            name: findMember.name,
            email: findMember.email,
            avatarUrl,
            workspaceId: workspace.id,
            plugInId,
            veilId,
          },
        });
      }

      return await prisma.endUser.create({
        data: {
          name,
          avatarUrl,
          workspaceId: workspace.id,
          plugInId,
          veilId,
        },
      });
    };

    const findUser = async () => {
      const user = await prisma.endUser.findUnique({
        where: {
          workspaceId_plugInId_veilId: {
            workspaceId: workspace.id,
            plugInId,
            veilId: veilId,
          },
        },
      });

      if (!user) return null;

      const findMember = await getMember();

      if (findMember && user.email !== findMember.email) {
        return await prisma.endUser.update({
          where: {
            id: user.id,
          },
          data: {
            name: findMember.name,
            email: findMember.email,
          },
        });
      }

      return user;
    };

    const endUser = (await findUser()) || (await createNewUser());

    return new NextResponse(
      JSON.stringify({ plugIn, workspace, endUser, bot }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Boot plugIn: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
