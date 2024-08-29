"use server";

import { nextAuthService } from "@/common/libs/NextAuthService";
import { ServerAPI } from "@/server/service/API";
import type { FAQGenerateUrlsPostResponse } from "@/server/types/FAQ";

export const generateSignedUrlsForFaq = async ({
  fileNames,
  wsUid,
}: {
  fileNames: { fileName: string; fileType: string }[];
  wsUid: string;
}) => {
  const acntUid = await nextAuthService.getAcntUid();

  const result = await ServerAPI<FAQGenerateUrlsPostResponse>({
    pathname: "/api/v1/faq/generate-upload-url",
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

  if (!result) throw "generateSignedUrlsForFaq: no result";

  const [signedUrls, taskUid] = [result.genUrls, result?.taskUid];

  return {
    signedUrls,
    taskUid,
  };
};
