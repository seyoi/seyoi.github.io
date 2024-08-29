"use server";

import { gcsService } from "@/common/libs/GoogleCloudStorageService";

export const getPrivateFileSignedUrlInBin = async ({
  path,
}: {
  path: string;
}) => {
  return await gcsService.getPrivateFileSignedUrlInBin({
    filePath: path,
  });
};
