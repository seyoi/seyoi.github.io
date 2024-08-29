"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ImageGalleryModalContext } from "@/common/stores/ImageGalleryModalContext";

export default function ImageGalleryModal() {
  const { images, currentImage, hideImageModal, changeCurrentImage } =
    useContext(ImageGalleryModalContext);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const currentImageIndex = images.findIndex(
    (image) => image.id === currentImage?.id,
  );

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handlePreviousClick = () => changePreviousImage();

  const handleNextClick = () => changeNextImage();

  const changePreviousImage = useCallback(() => {
    if (currentImageIndex <= 0) return;

    const previousImageIndex = currentImageIndex - 1;

    changeCurrentImage(images[previousImageIndex]);
  }, [changeCurrentImage, currentImageIndex, images]);

  const changeNextImage = useCallback(() => {
    if (currentImageIndex >= images.length - 1) return;

    const nextImageIndex = currentImageIndex + 1;

    changeCurrentImage(images[nextImageIndex]);
  }, [changeCurrentImage, currentImageIndex, images]);

  useEffect(() => {
    if (!sliderRef.current) return;

    setSliderWidth(sliderRef.current.clientWidth);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "Left") changePreviousImage();
      if (e.key === "ArrowRight" || e.key === "Right") changeNextImage();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [changeNextImage, changePreviousImage]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex w-full items-center justify-center bg-black-lighter"
      onMouseDown={hideImageModal}
    >
      <div
        ref={sliderRef}
        className="flex h-full w-full items-center justify-center transition-transform"
        style={{
          transform: `translate(-${sliderWidth * currentImageIndex}px)`,
        }}
      >
        {images.map(
          (image, i) =>
            image &&
            image.id === currentImage?.id && (
              <div
                key={image.id}
                className="absolute flex h-full w-full items-center justify-center"
                style={{
                  transform: `translate(${100 * i}%)`,
                }}
              >
                <div onMouseDownCapture={handleMouseDownCapture}>
                  <Image
                    src={image.signedUrl}
                    width={image.width || 0}
                    height={image.height || 0}
                    alt="modal image"
                    className="max-w-[600px]"
                  />
                </div>
              </div>
            ),
        )}
      </div>
      <div
        className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-[12px] px-[12px] py-[20px]"
        onMouseDownCapture={handleMouseDownCapture}
      >
        <div className="text-sm text-white-normal">
          {`${currentImage?.name} (${currentImageIndex + 1}/${images.length})`}
        </div>
        <div className="flex items-center justify-center gap-[8px]">
          <button
            type="button"
            onClick={handlePreviousClick}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[30px] bg-black-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M6.25 10.5L1.75 6L6.25 1.5"
                stroke="#E6E6E6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[30px] bg-black-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M1.75 1.5L6.25 6L1.75 10.5"
                stroke="#E6E6E6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href={`${currentImage?.signedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[30px] bg-black-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 13H13M7 8.5V1M7 8.5L10 5.5M7 8.5L4 5.5"
                stroke="#E6E6E6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
