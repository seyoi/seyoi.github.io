"use server";

import { revalidatePath } from "next/cache";
import { ServerAPI } from "@/server/service/API";
import type { FAQResponse } from "@/server/types/FAQ";

export const deleteFaq = async ({
  wsUid,
  bot_class_uid,
  qa_node_uid,
}: {
  wsUid: string;
  bot_class_uid: string;
  qa_node_uid: string;
}) => {
  const result = await ServerAPI<FAQResponse>({
    pathname: "/api/v1/faq/nodes",
    method: "DELETE",
    body: JSON.stringify({
      delete_request: {
        qa_node_uid,
      },
    }),
  });

  if (!result) throw "deleteFaq: no result";

  revalidatePath(`/workspaces/${wsUid}/ai-chatbots/${bot_class_uid}/faq`);
};
