import prisma from "@/common/libs/PrismaService";
import { NextResponse, type NextRequest } from "next/server";

type Step = {
  id: string;
  type: string;
  name: string;
  messages: {
    message: {
      text: { type: string; value: string };
      form?: {
        type: string;
        inputs: { type: string; label: string; options: string[] }[];
      };
      button?: {
        type: string;
        label: string;
        url: string;
      };
    };
  }[];
  nextButtons?: { text: string; nextStepId: string }[];
};

export async function POST(req: NextRequest) {
  try {
    const { userId, workspaceId, plugInId } = await req.json();

    if (!userId) throw new Error("CreateNewChat: No endUserId");
    if (!workspaceId) throw new Error("CreateNewChat: No workspaceId");
    if (!plugInId) throw new Error("CreateNewChat: No plugInId");

    const endUser = await prisma.endUser.findUniqueOrThrow({
      where: { id: userId },
    });

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId },
      include: {
        scenarios: {
          where: { workspaceId, state: "active" },
          include: { currentPlot: true },
        },
        bots: true,
      },
    });

    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId },
    });

    if (!workspace) throw new Error(`createNewEndUserChat: No workspace`);

    const bot = await prisma.workspaceBot.findUnique({ where: { plugInId } });

    if (!bot) throw new Error(`createNewEndUserChat: No bot`);

    const scenario = workspace.scenarios[0];

    // 시나리오로 챗 시작
    if (scenario) {
      if (!scenario.currentPlot)
        throw new Error(`createNewEndUserChat: No currentPlot`);

      const steps: Step[] = JSON.parse(scenario.currentPlot.steps as string);

      const firstStep = steps.find((step) => step.type === "start");

      if (!firstStep) throw new Error(`createNewEndUserChat: No firstStep`);

      const newUserChat = await prisma.endUserChat.create({
        data: {
          handling: "scenario",
          endUserId: endUser.id,
          workspaceId,
        },
      });

      const newBotMessage = await prisma.message.create({
        data: {
          plainText: firstStep.messages[0].message.text?.value,
          scenario: JSON.stringify({
            id: scenario.id,
            plotId: scenario.currentPlotId,
            stepId: firstStep.id,
            nextButtons: firstStep.nextButtons,
          }),
          personId: bot.id,
          personType: "bot",
          workspaceId,
          endUserChatId: newUserChat.id,
        },
      });

      const updatedUserChat = await prisma.endUserChat.update({
        where: { id: newUserChat.id },
        data: {
          currentMessageId: newBotMessage.id,
        },
      });

      await prisma.endUser.update({
        where: { id: endUser.id },
        data: {
          currentChatId: updatedUserChat.id,
        },
      });

      for (const member of members) {
        await prisma.chatSession.create({
          data: {
            id: `workspaceMember-${member.id}-endUserChat-${updatedUserChat.id}`,
            personId: member.id,
            personType: "member",
            unreadCount: 1,
            readAt: new Date(),
            workspaceId,
            endUserChatId: updatedUserChat.id,
          },
        });
      }

      const sessions = await prisma.chatSession.findMany({
        where: { endUserChatId: updatedUserChat.id },
      });

      return new NextResponse(
        JSON.stringify({
          userChat: updatedUserChat,
          messages: [newBotMessage],
          sessions,
        }),
        {
          status: 200,
        },
      );
    }

    const newUserChat = await prisma.endUserChat.create({
      data: {
        endUserId: endUser.id,
        workspaceId,
      },
    });

    const newBotMessage = await prisma.message.create({
      data: {
        personId: bot.id,
        personType: "bot",
        plainText: bot.welcomeMessage,
        workspaceId,
        endUserChatId: newUserChat.id,
      },
    });

    const updatedUserChat = await prisma.endUserChat.update({
      where: { id: newUserChat.id },
      data: {
        currentMessageId: newBotMessage.id,
      },
    });

    await prisma.endUser.update({
      where: { id: endUser.id },
      data: {
        currentChatId: updatedUserChat.id,
      },
    });

    for (const member of members) {
      await prisma.chatSession.create({
        data: {
          id: `workspaceMember-${member.id}-endUserChat-${updatedUserChat.id}`,
          personId: member.id,
          personType: "member",
          unreadCount: 1,
          readAt: new Date(),
          workspaceId,
          endUserChatId: updatedUserChat.id,
        },
      });
    }

    const sessions = await prisma.chatSession.findMany({
      where: { endUserChatId: updatedUserChat.id },
    });

    return new NextResponse(
      JSON.stringify({
        userChat: updatedUserChat,
        messages: [newBotMessage],
        sessions,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Create New UserChat: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
