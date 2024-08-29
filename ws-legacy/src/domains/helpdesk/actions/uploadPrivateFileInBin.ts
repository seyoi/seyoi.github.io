"use server";

import { gcsService } from "@/common/libs/GoogleCloudStorageService";

export const uploadPrivateFileInBin = async ({
  formData,
  filePath,
}: {
  formData: FormData;
  filePath: string;
}) => {
  const file = formData.get("file") as File;
  await gcsService.uploadPrivateFileInBin({ file, filePath });
};
