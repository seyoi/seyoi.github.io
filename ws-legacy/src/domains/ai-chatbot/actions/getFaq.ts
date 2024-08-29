"use server";

import { ServerAPI } from "@/server/service/API";
import type { FAQResponse } from "@/server/types/FAQ";

export const getFaq = async ({ bot_class_uid }: { bot_class_uid: string }) => {
  const result = await ServerAPI<FAQResponse>({
    pathname: `/api/v1/faq/nodes?bot_class_uid=${bot_class_uid}`,
    method: "GET",
  });

  if (!result) throw "getFaq: no result";

  const rootNodes = result.get_response?.qa_nodes;

  const nodes = rootNodes?.flatMap((rootNode) => rootNode.children);

  return {
    nodes,
    rootNodeIds: rootNodes?.map((rootNode) => rootNode.qa_uid),
  };
};
