"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { updateWorkspace } from "@/domains/workspace/actions/updateWorkspace";
import { AlertContext } from "@/common/stores/AlertContext";
import { type Workspace } from "@prisma/client";
import { firebaseService } from "@/common/libs/FirebaseService";

export default function WorkspaceSettingForm({
  initialWorkspace,
}: {
  initialWorkspace: Workspace | null;
}) {
  // const { workspace } = useContext(WorkspaceContext);
  const { addAlert } = useContext(AlertContext);
  // const { showPopUp } = useContext(PopUpContext);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(initialWorkspace?.avatarUrl || "");
  const [name, setName] = useState(initialWorkspace?.name || "");
  const [welcomeMessage, setWelcomeMessage] = useState(
    initialWorkspace?.welcomeMessage || "",
  );

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        const encodeFileToBase64 = (file: File) => {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
              if (reader.result) {
                setFile(file);
                setAvatarUrl(reader.result as string);
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

  const handleRemoveAvatar = () => {
    setFile(null);
    setAvatarUrl(
      "https://firebasestorage.googleapis.com/v0/b/dcty-saas-fire-deva/o/avatars%2Fbots%2Fdocenty%2Fimage%206.png?alt=media&token=2c664182-dd65-447e-bbef-e33ee211a43a",
    );
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleChangeWelcomeMessage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWelcomeMessage(e.target.value);

  const handleClickSave = async () => {
    try {
      addAlert({ type: "ok", text: "업데이트중입니다. 잠시만 기다려주세요." });

      let uploadedAvatarUrl: string | undefined = "";
      if (file) {
        uploadedAvatarUrl = await firebaseService.uploadImageByFile({
          filePath: "/avatars",
          file,
        });
      } else {
        uploadedAvatarUrl = avatarUrl;
      }
      const { workspace, error } = await updateWorkspace({
        workspaceId: initialWorkspace?.id as string,
        avatarUrl: uploadedAvatarUrl,
        name,
        welcomeMessage,
      });
      if (error) throw error;
      setAvatarUrl(workspace?.avatarUrl as string);
      setName(workspace?.name as string);
      setWelcomeMessage(workspace?.welcomeMessage as string);
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  // const handleClickDelete = () => {
  //   showPopUp({
  //     title: "워크스페이스를 삭제하시겠습니까?",
  //     subTitle:
  //       "삭제하시면 워크스페이스와 관련된 모든 데이터가 삭제됩니다. 이 동작은 되돌릴수 없습니다.",
  //     actionType: "delete",
  //     action: async () => {
  //       try {
  //         if (!workspace) throw "handleClickDelete: No workspace";

  //         const result = await deleteWorkspace({
  //           workspaceId: workspace.id,
  //         });

  //         if (result.error) {
  //           addAlert({
  //             type: "error",
  //             text: "워크스페이스 삭제에 실패했습니다.",
  //           });
  //           throw result.error;
  //         }
  //       } catch (err) {
  //         throw `handleClickDelete: ${err}`;
  //       }
  //     },
  //   });
  // };

  return (
    <div className="flex w-[420px] flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[20px]">
        <div className="flex flex-col">
          <div className="text-lg">워크스페이스 설정 변경</div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col">
              <div className="text-md">대표 이미지</div>
              <div className="text-sm text-gray-normal"></div>
              워크스페이스에 보이는 대표 이미지를 설정하세요
            </div>
            <div className="relative flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[36px] border border-gray-light bg-white-normal">
              {avatarUrl ? (
                <Image
                  src={avatarUrl || "/images/llm/gpt4o.png"}
                  alt="bot avatar"
                  fill
                  className="object-contain"
                />
              ) : (
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="90" height="90" fill="url(#pattern0_871_8087)" />
                  <defs>
                    <pattern
                      id="pattern0_871_8087"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_871_8087"
                        transform="scale(0.00555556)"
                      />
                    </pattern>
                    <image
                      id="image0_871_8087"
                      width="180"
                      height="180"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              )}
            </div>
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
          <label htmlFor="name" className="flex flex-col gap-[8px]">
            <div id="name" className="text-md">
              워크스페이스 이름
            </div>
            <input
              className="rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[12px] py-[8px] text-md placeholder:text-gray-light"
              placeholder="워크스페이스 이름"
              value={name}
              onChange={handleChangeName}
            />
          </label>
          <label htmlFor="welcomeMessage" className="flex flex-col gap-[8px]">
            <div id="welcomeMessage" className="text-md">
              웰컴 메세지
            </div>
            <input
              className="rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[12px] py-[8px] text-md placeholder:text-gray-light"
              placeholder="웰컴 메세지"
              value={welcomeMessage}
              onChange={handleChangeWelcomeMessage}
            />
          </label>
        </div>
        <button
          type="button"
          className="flex items-center justify-center self-end rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal"
          onClick={handleClickSave}
        >
          저장
        </button>
      </div>
      <div className="flex">
        {/* <button
          type="button"
          className="flex items-center justify-center rounded-[8px] bg-red-normal px-[16px] py-[8px] text-md text-white-normal"
          onClick={handleClickDelete}
        >
          워크스페이스 삭제
        </button> */}
      </div>
    </div>
  );
}
