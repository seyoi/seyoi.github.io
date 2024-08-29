import { readFileAsDataURL } from "./readFileAsDataUrl";

export const getImageDimensionFromFile = async (file: File) => {
  const dataUrl = await readFileAsDataURL(file);
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  return { width: img.naturalWidth, height: img.naturalHeight };
};
