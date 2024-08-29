"use client";

import { createContext, useState } from "react";
import ImageModal from "@/common/components/ImageGalleryModal";
import type { MessageFile } from "@prisma/client";
import { getPrivateFileSignedUrlInBin } from "@/domains/helpdesk/actions/getPrivateFileSignedUrlInBin";

type ImageFileWithSignedUrl = MessageFile & { signedUrl: string };

export const ImageGalleryModalContext = createContext<{
  images: ImageFileWithSignedUrl[];
  currentImage: ImageFileWithSignedUrl | null;
  showImageModal: ({
    files,
    currentFileId,
  }: {
    files: MessageFile[];
    currentFileId: string;
  }) => Promise<void>;
  hideImageModal: () => void;
  changeCurrentImage: (image: ImageFileWithSignedUrl) => void;
}>({
  images: [],
  currentImage: null,
  showImageModal: async () => {
    return;
  },
  hideImageModal: () => null,
  changeCurrentImage: () => null,
});

export default function ImageGalleryModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [images, setImages] = useState<ImageFileWithSignedUrl[]>([]);
  const [currentImage, setCurrentImage] =
    useState<ImageFileWithSignedUrl | null>(null);
  const [isShow, setIsShow] = useState(false);

  const showImageModal = async ({
    files,
    currentFileId,
  }: {
    files: MessageFile[];
    currentFileId: string;
  }) => {
    const mappedImages: ImageFileWithSignedUrl[] = [];
    for (const file of files) {
      const signedUrl = await getPrivateFileSignedUrlInBin({
        path: file.path,
      });
      mappedImages.push({ ...file, signedUrl });
    }
    setImages(mappedImages);
    setCurrentImage(mappedImages.find((image) => image.id === currentFileId)!);
    setIsShow(true);
  };

  const hideImageModal = () => {
    setImages([]);
    setCurrentImage(null);
    setIsShow(false);
  };

  const changeCurrentImage = (image: ImageFileWithSignedUrl) => {
    setCurrentImage(image);
  };

  return (
    <ImageGalleryModalContext.Provider
      value={{
        images,
        currentImage,
        showImageModal,
        hideImageModal,
        changeCurrentImage,
      }}
    >
      {children}
      {isShow && <ImageModal />}
    </ImageGalleryModalContext.Provider>
  );
}
