"use server";

import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { AIBotKnowledgeResponse } from "@/server/types/AIBotKnowledge";

export const getAIBotKnowledgeItem = async ({
  botClsUid,
  wsUid,
  itemUid,
}: {
  botClsUid: string;
  wsUid: string;
  itemUid: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result = await ServerAPI<AIBotKnowledgeResponse>({
    pathname: `/api/v1/knlg/items/botcls/${botClsUid}/${itemUid}`,
    queryParams: `?wsUid=${wsUid}&anctUid=${acntUid}`,
    method: "GET",
  });

  const aiBotKnowledge = result.items?.[0];

  return aiBotKnowledge;
};
