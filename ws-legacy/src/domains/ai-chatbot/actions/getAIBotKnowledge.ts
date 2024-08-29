import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { AIBotKnowledgeResponse } from "@/server/types/AIBotKnowledge";

export const getAIBotKnowledge = async ({
  botId,
  workspaceId,
}: {
  botId: string;
  workspaceId: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result = await ServerAPI<AIBotKnowledgeResponse>({
    pathname: `/api/v1/knlg/items/botcls/${botId}`,
    queryParams: `?wsUid=${workspaceId}&acntUid=${acntUid}`,
    method: "GET",
  });

  const aiBotknowledge = result.items?.[0];

  return {
    aiBotknowledge,
  };
};
