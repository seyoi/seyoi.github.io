"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/common/libs/PrismaService";
import { firebaseService } from "@/common/libs/FirebaseService";
import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import { wait } from "@/common/utils/wait";
import type { AIBotResponse } from "@/server/types/AIBot";

export const createBot = async ({
  web_reqData,
  file_reqData,
  text_reqData,
  taskUid,
  workspaceId,
}: {
  web_reqData?: {
    startUrls: string[];
    leafUrls: string[];
    allowedDomains: string[];
    depthLimit: number;
    perPageLinkLimit: number;
  }[];
  file_reqData?: { fileNames: { fileName: string; fileType: string }[] }[];
  text_reqData?: { texts: string }[];
  taskUid?: string;
  workspaceId: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result = await ServerAPI<AIBotResponse>({
    pathname: "/api/v1/smart/chatbot",
    method: "POST",
    body: JSON.stringify({
      web_reqData,
      file_reqData,
      text_reqData,
      taskUid,
      wsUid: workspaceId,
      acntUid,
    }),
  });

  const aiBot = result.items?.[0];

  if (!aiBot) throw "createBot: No aiBot";

  await wait(2000);

  const id = aiBot.uid;
  const avatarUrl = firebaseService.getRandomAvatar();

  await prisma.workspacePlugIn.create({
    data: {
      buttonImageUrl:
        "https://firebasestorage.googleapis.com/v0/b/dcty-saas-fire-deva/o/buttons%2Fbots%2Fdocenty%2Fimage%206.png?alt=media&token=cdd00e8e-ad25-4469-894d-ad28d8f5fff0",
      buttonLabelText: "궁금한 사항이 있으시면 채팅으로 문의 주세요!",
      themeColor: "#416BFF",
      workspaceId,
      bot: {
        create: {
          id,
          avatarUrl,
          name: `챗봇`,
          welcomeMessage: `안녕하세요! 챗봇입니다.\n무엇을 도와드릴까요?`,
          workspaceId,
          botClsUid: id,
        },
      },
    },
    include: { bot: true },
  });

  revalidatePath(`/workspaces/${workspaceId}/ai-chatbots/${id}/contents`);
  redirect(`/workspaces/${workspaceId}/ai-chatbots/${id}/contents`);
};
