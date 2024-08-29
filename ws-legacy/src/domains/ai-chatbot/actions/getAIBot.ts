import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { AIBotResponse } from "@/server/types/AIBot";

export const getAIBot = async ({
  botId,
  workspaceId,
}: {
  botId: string;
  workspaceId: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result = await ServerAPI<AIBotResponse>({
    pathname: `/api/v1/bot/items/${botId}`,
    queryParams: `?wsUid=${workspaceId}&acntUid=${acntUid}`,
    method: "GET",
  });

  const aiBot = result?.items?.[0];

  return {
    aiBot,
  };
};
