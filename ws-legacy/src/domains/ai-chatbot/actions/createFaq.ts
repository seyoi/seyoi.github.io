"use server";

import { revalidatePath } from "next/cache";
import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { FAQResponse } from "@/server/types/FAQ";

export const createFaq = async ({
  fileNames,
  wsUid,
  taskUid,
  botClsUid,
}: {
  fileNames: { fileName: string; fileType: string }[];
  wsUid: string;
  taskUid: string;
  botClsUid: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result = await ServerAPI<FAQResponse>({
    pathname: "/api/v1/faq/nodes",
    method: "POST",
    body: JSON.stringify({
      file_request: {
        reqData: {
          ingestionType: "UPLOAD_File_Plain",
          fileNames,
        },
        wsUid,
        acntUid,
        taskUid,
        botClsUid,
      },
    }),
  });

  if (!result) throw "createFaq: no result";

  revalidatePath(`/workspaces/${wsUid}/ai-chatbots/${botClsUid}/faq`);
};
