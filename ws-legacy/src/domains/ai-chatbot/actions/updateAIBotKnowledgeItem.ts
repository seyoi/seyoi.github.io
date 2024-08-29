"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ServerAPI } from "@/server/service/API";
import type { AIBotKnowledgeItemStatus } from "@/server/types/AIBotKnowledge";
import type { AIBotResponse } from "@/server/types/AIBot";

export const updateAIBotKnowledgeItem = async ({
  botClsUid,
  itemUid,
  wsUid,
  acntUid,
  draftTitle,
  draftPageContent,
  draftStatus,
}: {
  botClsUid: string;
  itemUid: string;
  wsUid: string;
  acntUid: string;
  draftTitle?: string;
  draftPageContent?: string;
  draftStatus?: AIBotKnowledgeItemStatus;
}) => {
  await ServerAPI<AIBotResponse>({
    pathname: `/api/v1/ingest/items/${botClsUid}`,
    method: "PATCH",
    body: JSON.stringify({
      uid: itemUid,
      wsUid,
      acntUid,
      document: {
        title: draftTitle,
        modified_pageContent: draftPageContent,
        status: draftStatus,
      },
    }),
  });

  revalidatePath(`/workspaces/${wsUid}/ai-chatbots/${botClsUid}/contents`);

  if (draftStatus === "DELETE")
    redirect(`/workspaces/${wsUid}/ai-chatbots/${botClsUid}/contents`);
};
