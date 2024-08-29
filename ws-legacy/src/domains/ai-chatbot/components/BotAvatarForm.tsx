"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { updateBotAvatar } from "@/domains/ai-chatbot/actions/updateBotAvatar";
import { BotProfileContext } from "@/domains/ai-chatbot/stores/BotProfileContext";
import { AlertContext } from "@/common/stores/AlertContext";
import { firebaseService } from "@/common/libs/FirebaseService";
import ImageCropModal, {
  useImageCropModal,
} from "../../../common/components/ImageCropModal";

export default function BotAvatarForm() {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { addAlert } = useContext(AlertContext);
  const { plugInId, avatarUrl, coverImageUrl, setAvatarUrl, setCoverImageUrl } =
    useContext(BotProfileContext);
  const {
    isShowImageCropModal: isShowAvatarImageCropModal,
    showImageCropModal: showAvatarImageCropModal,
    hideImageCropModal: hideAvatarImageCropModal,
  } = useImageCropModal();
  const {
    isShowImageCropModal: isShowCoverImageCropModal,
    showImageCropModal: showCoverImageCropModal,
    hideImageCropModal: hideCoverImageCropModal,
  } = useImageCropModal();
  const [draftAvatarUrl, setDraftAvatarUrl] = useState<string>("");
  const [draftCoverUrl, setDraftCoverUrl] = useState<string>("");

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        const encodeFileToBase64 = (file: File) => {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
              const result = reader.result;
              if (result && typeof result === "string") {
                const img = new window.Image();
                img.src = result;

                img.onload = () => {
                  setDraftAvatarUrl(result);
                  showAvatarImageCropModal();
                  e.target.value = "";
                };
              }

              resolve("Done");
            };
          });
        };
        encodeFileToBase64(file);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        const encodeFileToBase64 = (file: File) => {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
              const result = reader.result;
              if (result && typeof result === "string") {
                const img = new window.Image();
                img.src = result;

                img.onload = () => {
                  setDraftCoverUrl(result);
                  showCoverImageCropModal();
                  e.target.value = "";
                };
              }

              resolve("Done");
            };
          });
        };
        encodeFileToBase64(file);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmAvatar = async (croppedAvatarDataUrl: string) => {
    const uploadedAvatarUrl = await firebaseService.uploadImageByDataUrl({
      filePath: `/avatars`,
      dataUrl: croppedAvatarDataUrl,
    });
    setAvatarUrl(uploadedAvatarUrl);
  };

  const handleRemoveAvatar = () =>
    setAvatarUrl("https://storage.googleapis.com/image-dcty/dcty-logo.png");

  const confirmCover = async (croppedCoverImageDataUrl: string) => {
    const uploadedCoverImageDataUrl =
      await firebaseService.uploadImageByDataUrl({
        filePath: `/covers`,
        dataUrl: croppedCoverImageDataUrl,
      });
    setCoverImageUrl(uploadedCoverImageDataUrl);
  };

  const handleRemoveCover = () => setCoverImageUrl(null);

  const handleClickSave = async () => {
    try {
      addAlert({ type: "ok", text: "업데이트중입니다. 잠시만 기다려주세요." });
      const { bot, plugIn, error } = await updateBotAvatar({
        workspaceId,
        botId,
        plugInId,
        avatarUrl:
          avatarUrl !==
          "https://storage.googleapis.com/image-dcty/dcty-logo.png"
            ? avatarUrl
            : "https://storage.googleapis.com/image-dcty/dcty-logo.png",
        coverImageUrl,
      });
      if (error) throw error;
      setAvatarUrl(bot?.avatarUrl as string);
      setCoverImageUrl(plugIn?.coverImageUrl as string);
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[20px]">
      <div className="flex flex-col">
        <div className="text-lg">챗봇 이미지 설정</div>
        <div className="text-sm text-gray-normal">
          고객이 보게 될 브랜드 이미지를 설정해주세요.
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col">
            <div className="text-md">프로필 이미지</div>
          </div>
          <div className="relative flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[36px] border border-gray-light bg-white-normal">
            {avatarUrl ? (
              <Image
                src={avatarUrl || "/images/llm/gpt4o.png"}
                alt="bot avatar"
                fill
                className="object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
              >
                <rect width="56" height="56" rx="24" fill="#E6E6E6" />
                <path
                  d="M25.6172 29.3262H23.9462C23.6702 29.3262 23.4464 29.5503 23.4464 29.8267V32.5359C23.4464 32.8125 23.6702 33.0366 23.9462 33.0366H25.6172C25.8933 33.0366 26.1171 32.8125 26.1171 32.5359V29.8267C26.1171 29.5503 25.8933 29.3262 25.6172 29.3262Z"
                  fill="#A6A6A6"
                />
                <path
                  d="M31.5956 29.3262H29.9246C29.6486 29.3262 29.4248 29.5503 29.4248 29.8267V32.5359C29.4248 32.8125 29.6486 33.0366 29.9246 33.0366H31.5956C31.8716 33.0366 32.0954 32.8125 32.0954 32.5359V29.8267C32.0954 29.5503 31.8716 29.3262 31.5956 29.3262Z"
                  fill="#A6A6A6"
                />
                <path
                  d="M42.3278 29.6508H41.1914C40.77 27.5934 39.7152 25.562 38.0412 23.8888C38.0412 23.8888 34.4611 19.7796 28.8581 19.2966C28.8437 19.2966 28.8291 19.2966 28.8145 19.2936C28.6576 19.282 28.5007 19.2704 28.3408 19.2616C28.1578 19.2529 27.9747 19.25 27.7916 19.25C27.6085 19.25 27.4225 19.2558 27.2423 19.2616C27.0825 19.2675 26.9256 19.2791 26.7687 19.2936C26.7541 19.2936 26.7367 19.2936 26.7221 19.2966C21.1193 19.7796 17.5448 23.8888 17.5448 23.8888C15.8738 25.562 14.816 27.5934 14.3946 29.6508H13.2496C12.5609 29.6508 12 30.2095 12 30.9022V33.9753C12 34.6651 12.558 35.2268 13.2496 35.2268H14.2377C14.6242 38.5006 17.4024 41.0411 20.7763 41.0411H27.9369L36.414 45.6305C37.9628 46.6198 39.9943 45.5054 39.9943 43.6662V38.5209C40.7235 37.5926 41.2089 36.4636 41.3543 35.2297H42.3307C43.0193 35.2297 43.5802 34.6709 43.5802 33.9782V30.9051C43.5802 30.2154 43.0222 29.6537 42.3307 29.6537L42.3278 29.6508ZM36.8236 34.7726C36.8236 35.8553 35.949 36.7312 34.8679 36.7312H34.7254V39.3882C34.7254 39.6384 34.4494 39.7899 34.2402 39.6531L29.7415 36.7312H20.7095C19.6284 36.7312 18.7537 35.8553 18.7537 34.7726V28.3239C18.7537 27.2413 19.6284 26.3654 20.7095 26.3654H34.8679C35.949 26.3654 36.8236 27.2413 36.8236 28.3239V34.7726Z"
                  fill="#A6A6A6"
                />
                <path
                  d="M23.8507 18.609C24.7312 18.3238 25.6903 18.1142 26.719 18.024C26.7335 18.024 26.751 18.024 26.7655 18.0211C26.9224 18.0095 27.0794 17.9978 27.2392 17.9891C27.4223 17.9804 27.6054 17.9775 27.7884 17.9775C27.9715 17.9775 28.1576 17.9833 28.3376 17.9891C28.4976 17.9949 28.6545 18.0066 28.8113 18.0211C28.8259 18.0211 28.8405 18.0211 28.8549 18.024C29.8808 18.1113 30.8399 18.3238 31.7233 18.609C31.4965 16.8716 30.154 15.4864 28.4365 15.2041V13.4689C29.1048 13.207 29.5814 12.558 29.5814 11.7956C29.5814 10.8032 28.7794 10 27.7884 10C26.7975 10 25.9954 10.8032 25.9954 11.7956C25.9954 12.558 26.4691 13.207 27.1404 13.4689V15.2041C25.4229 15.4864 24.0774 16.8716 23.8536 18.609H23.8507Z"
                  fill="#A6A6A6"
                />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-[8px]">
            <label className="flex cursor-pointer items-center justify-center rounded-[4px] bg-blue-normal px-[12px] py-[4px] text-sm text-white-normal">
              파일 첨부
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleChangeAvatar}
              />
            </label>
            <button
              type="button"
              className="flex items-center justify-center rounded-[4px] bg-gray-lighter px-[12px] py-[4px] text-sm text-gray-normal"
              onClick={handleRemoveAvatar}
            >
              기본형
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col">
            <div className="text-md">커버 이미지</div>
            <div className="text-sm text-gray-normal">
              권장 이미지 크기 : 최소 가로 780px, 세로 : 400px
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <label className="flex cursor-pointer items-center justify-center rounded-[4px] bg-blue-normal px-[12px] py-[4px] text-sm text-white-normal">
              파일 첨부
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleChangeCover}
              />
            </label>
            <button
              type="button"
              className="flex items-center justify-center rounded-[4px] bg-gray-lighter px-[12px] py-[4px] text-sm text-gray-normal"
              onClick={handleRemoveCover}
            >
              커버 삭제
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center justify-center self-end rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal"
        onClick={handleClickSave}
      >
        저장
      </button>
      {isShowAvatarImageCropModal && (
        <ImageCropModal
          draftImageUrl={draftAvatarUrl}
          croppedWidth={160}
          croppedHeight={160}
          borderRadius={56}
          hideImageCropModal={hideAvatarImageCropModal}
          setCroppedImageDataUrl={confirmAvatar}
        />
      )}
      {isShowCoverImageCropModal && (
        <ImageCropModal
          draftImageUrl={draftCoverUrl}
          croppedWidth={390}
          croppedHeight={200}
          borderRadius={0}
          hideImageCropModal={hideCoverImageCropModal}
          setCroppedImageDataUrl={confirmCover}
        />
      )}
    </div>
  );
}
