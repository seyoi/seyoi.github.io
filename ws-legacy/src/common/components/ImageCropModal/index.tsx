"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageDataUrl } from "@/common/utils/getCroppedImageDataUrl";

export default function ImageCropModal({
  draftImageUrl,
  croppedWidth,
  croppedHeight,
  borderRadius,
  hideImageCropModal,
  setCroppedImageDataUrl,
}: {
  draftImageUrl: string;
  croppedWidth: number;
  croppedHeight: number;
  borderRadius: number;
  hideImageCropModal: () => void;
  setCroppedImageDataUrl: (croppedImageDataUrl: string) => Promise<void>;
}) {
  const minZoom = 1;
  const maxZoom = 5;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(minZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleChangeZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const draftZoom = Number(e.target.value);
    if (draftZoom < minZoom) setZoom(minZoom);
    if (draftZoom > maxZoom) setZoom(maxZoom);
    setZoom(draftZoom);
  };

  const handleClickConfirm = async () => {
    try {
      const croppedImageDataUrl = await getCroppedImageDataUrl(
        draftImageUrl,
        croppedAreaPixels,
      );
      if (croppedImageDataUrl) setCroppedImageDataUrl(croppedImageDataUrl);
    } catch (e) {
      console.error(e);
    } finally {
      hideImageCropModal();
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex items-center justify-center bg-black-lighter"
      onClick={hideImageCropModal}
    >
      <div
        className="w-[min(430px,100%)] rounded-[24px] bg-white-normal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="p-[20px] text-lg">사진 업로드</div>
          <div className="flex items-center justify-center px-[20px]">
            <div
              className="relative overflow-hidden outline outline-offset-[1px] outline-gray-light"
              style={{
                width: croppedWidth,
                height: croppedHeight,
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Cropper
                image={draftImageUrl}
                crop={crop}
                zoom={zoom}
                aspect={croppedWidth / croppedHeight}
                showGrid={false}
                onWheelRequest={() => false}
                onZoomChange={setZoom}
                onCropChange={setCrop}
                onCropComplete={(_, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
                objectFit="horizontal-cover"
              />
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center gap-[12px] py-[20px]">
            <div className="flex h-[18px] w-[18px] items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M9.5 4.33333H9.50667M1.5 9.66666L4.83333 6.33333C5.452 5.738 6.21467 5.738 6.83333 6.33333L10.1667 9.66666M8.83333 8.33333L9.5 7.66666C10.1187 7.07133 10.8813 7.07133 11.5 7.66666L13.5 9.66666M1.5 3C1.5 2.46957 1.71071 1.96086 2.08579 1.58579C2.46086 1.21071 2.96957 1 3.5 1H11.5C12.0304 1 12.5391 1.21071 12.9142 1.58579C13.2893 1.96086 13.5 2.46957 13.5 3V11C13.5 11.5304 13.2893 12.0391 12.9142 12.4142C12.5391 12.7893 12.0304 13 11.5 13H3.5C2.96957 13 2.46086 12.7893 2.08579 12.4142C1.71071 12.0391 1.5 11.5304 1.5 11V3Z"
                  stroke="#A6A6A6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex w-[160px] items-center justify-center">
              <input
                type="range"
                className="slider flex-1 appearance-none"
                value={zoom}
                onChange={handleChangeZoom}
                min={minZoom}
                max={maxZoom}
                step="any"
              />
            </div>
            <div className="flex h-[26px] w-[26px] items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M14.8333 6.55556H14.8444M1.5 15.4444L7.05556 9.88889C8.08667 8.89666 9.35778 8.89666 10.3889 9.88889L15.9444 15.4444M13.7222 13.2222L14.8333 12.1111C15.8644 11.1189 17.1356 11.1189 18.1667 12.1111L21.5 15.4444M1.5 4.33333C1.5 3.44928 1.85119 2.60143 2.47631 1.97631C3.10143 1.35119 3.94928 1 4.83333 1H18.1667C19.0507 1 19.8986 1.35119 20.5237 1.97631C21.1488 2.60143 21.5 3.44928 21.5 4.33333V17.6667C21.5 18.5507 21.1488 19.3986 20.5237 20.0237C19.8986 20.6488 19.0507 21 18.1667 21H4.83333C3.94928 21 3.10143 20.6488 2.47631 20.0237C1.85119 19.3986 1.5 18.5507 1.5 17.6667V4.33333Z"
                  stroke="#A6A6A6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-[4px] self-end p-[20px] pt-0">
            <button
              type="button"
              className="flex items-center justify-center rounded-[8px] bg-gray-lighter px-[16px] py-[8px] text-boldmd text-gray-normal"
              onClick={hideImageCropModal}
            >
              취소
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-boldmd text-white-normal"
              onClick={handleClickConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const useImageCropModal = () => {
  const [isShowImageCropModal, setIsShowImageCropModal] = useState(false);

  const showImageCropModal = () => setIsShowImageCropModal(true);

  const hideImageCropModal = () => setIsShowImageCropModal(false);

  return {
    isShowImageCropModal,
    showImageCropModal,
    hideImageCropModal,
  };
};
