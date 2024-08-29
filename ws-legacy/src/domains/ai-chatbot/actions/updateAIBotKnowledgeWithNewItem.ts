"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { AIBotResponse } from "@/server/types/AIBot";

export const updateAIBotKnowledgeWithNewItem = async ({
  web_reqData,
  file_reqData,
  text_reqData,
  taskUid,
  botClsUid,
  wsUid,
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
  botClsUid: string;
  wsUid: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  await ServerAPI<AIBotResponse>({
    pathname: `/api/v1/smart/chatbot/${botClsUid}`,
    method: "PATCH",
    body: JSON.stringify({
      web_reqData,
      file_reqData,
      text_reqData,
      taskUid,
      wsUid,
      acntUid,
    }),
  });

  revalidatePath(`/workspaces/${wsUid}/ai-chatbots/${botClsUid}/contents`);
  redirect(`/workspaces/${wsUid}/ai-chatbots/${botClsUid}/contents`);
};
