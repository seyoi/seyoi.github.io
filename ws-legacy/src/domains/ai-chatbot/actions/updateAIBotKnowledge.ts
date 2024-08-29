"use server";

import { revalidatePath } from "next/cache";
import { ServerAPI } from "@/server/service/API";
import type {
  AIBotKnowledgeDTO,
  AIBotKnowledgeResponse,
} from "@/server/types/AIBotKnowledge";

export const updateAIBotKnowledge = async ({
  botClsUid,
  aiBotKnowledge,
  used_itemuids,
  unused_itemuids,
  deleted_itemuids,
}: {
  botClsUid?: string;
  aiBotKnowledge?: AIBotKnowledgeDTO;
  used_itemuids?: string[];
  unused_itemuids?: string[];
  deleted_itemuids?: string[];
}) => {
  await ServerAPI<AIBotKnowledgeResponse>({
    pathname: `/api/v1/knlg/items/${botClsUid}`,
    method: "PATCH",
    body: JSON.stringify({
      uid: aiBotKnowledge?.uid,
      acntUid: aiBotKnowledge?.acntUid,
      wsUid: aiBotKnowledge?.wsUid,
      itemuidSelections: { used_itemuids, unused_itemuids, deleted_itemuids },
    }),
  });

  revalidatePath(
    `/workspaces/${aiBotKnowledge?.wsUid}/ai-chatbots/${aiBotKnowledge?.uid}/contents`,
  );
};
