import prisma from "@/common/libs/PrismaService";
import { NextResponse, type NextRequest } from "next/server";
import { type Message } from "@prisma/client";

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

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { chatId } = params;
    const {
      scenarioId,
      plotId,
      nextStepId,
      personId,
      personType,
      workspaceId,
    } = await req.json();

    const scenario = await prisma.workspaceScenario.findUniqueOrThrow({
      where: { id: scenarioId },
    });

    const plot = await prisma.workspacePlot.findUniqueOrThrow({
      where: { id: plotId },
    });

    const steps: Step[] = JSON.parse(plot.steps as string);

    const nextStep = steps.find((step) => step.id === nextStepId);

    if (!nextStep) throw new Error("createMessageScenario: No Next Step");

    const messages: Message[] = [];

    for (const stepMessage of nextStep.messages) {
      const newMessage = await prisma.message.create({
        data: {
          plainText: stepMessage.message.text.value,
          button: JSON.stringify(stepMessage.message.button),
          form: JSON.stringify(stepMessage.message.form),
          scenario: JSON.stringify({
            id: scenario.id,
            plotId: plot.id,
            stepId: nextStep.id,
            nextButtons: nextStep.nextButtons,
          }),
          personId,
          personType,
          workspaceId,
          endUserChatId: chatId,
        },
      });
      messages.push(newMessage);
    }

    const updatedUserChat = await prisma.endUserChat.update({
      where: { id: chatId },
      data: {
        currentMessageId: messages[messages.length - 1]?.id,
        handling: nextStep.type !== "end" ? "scenario" : null,
      },
      include: { currentMessage: true },
    });

    return new NextResponse(
      JSON.stringify({
        messages,
        userChat: updatedUserChat,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Create New Message Scenario: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
