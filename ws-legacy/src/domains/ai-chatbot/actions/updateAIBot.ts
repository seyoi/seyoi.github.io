"use server";

import { revalidatePath } from "next/cache";
import { ServerAPI } from "@/server/service/API";
import type { AIBotDTO, AIBotResponse } from "@/server/types/AIBot";

export const updateAIBot = async ({
  aiBot,
  updateParams,
}: {
  aiBot?: AIBotDTO;
  updateParams: {
    model?: {
      namedPrompts: [{ name: "0"; value: string }];
    };
    modelName?: string;
  };
}) => {
  await ServerAPI<AIBotResponse>({
    pathname: `/api/v1/bot/items/${aiBot?.uid}`,
    method: "PATCH",
    body: JSON.stringify({
      updateParams: {
        ...updateParams,
        ownership: {
          wsUid: aiBot?.wsUid,
          acntUid: aiBot?.acntUid,
        },
      },
      ownership: {
        wsUid: aiBot?.wsUid,
        acntUid: aiBot?.acntUid,
      },
    }),
  });

  revalidatePath(
    `/workspaces/${aiBot?.wsUid}/ai-chatbots/${aiBot?.uid}/prompt`,
  );
};
