"use server";

import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { AIBotKnowledgeFileScrapingGenerateUrlsResponse } from "@/server/types/AIBotKnowledge";

export const generateSignedUrls = async ({
  fileNames,
  wsUid,
}: {
  fileNames: { fileName: string; fileType: string }[];
  wsUid: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result =
    await ServerAPI<AIBotKnowledgeFileScrapingGenerateUrlsResponse>({
      pathname: "/api/v1/ingest/generate-upload-url",
      method: "POST",
      body: JSON.stringify({
        reqData: {
          fileNames,
          ingestionType: "UPLOAD_File_Plain",
        },
        wsUid,
        acntUid,
        loadingName: "uploaded",
      }),
    });

  if (!result) throw "generateSignedUrls: no result";

  const [signedUrls, taskUid] = [result.genUrls, result?.taskUid];

  return {
    signedUrls,
    taskUid,
  };
};
