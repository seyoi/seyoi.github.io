import { isImageFileType } from "@/common/utils/isImageFileType";
import { getImageDimensionFromFile } from "@/common/utils/getImageDimensionFromFile";

export const formatDraftMessageFile = async ({
  formData,
  filePath,
}: {
  formData: FormData;
  filePath: string;
}) => {
  const file = formData.get("file") as File;
  const [type, name, size, path] = [file.type, file.name, file.size, filePath];
  let [width, height] = [0, 0];

  if (isImageFileType(type)) {
    const { width: draftWith, height: draftHeight } =
      await getImageDimensionFromFile(file);

    width = draftWith;
    height = draftHeight;
  }

  return { type, name, size, width, height, path };
};
