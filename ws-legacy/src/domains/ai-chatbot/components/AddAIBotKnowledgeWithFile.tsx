"use client";

import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { ModalContext } from "@/common/stores/ModalContext";
import { generateSignedUrls } from "@/domains/ai-chatbot/actions/generateSignedUrls";
import { updateAIBotKnowledgeWithNewItem } from "@/domains/ai-chatbot/actions/updateAIBotKnowledgeWithNewItem";
import { formatFileSize } from "@/common/utils/formatFileSize";
import {
  getAcceptFileString,
  isValidFileType,
} from "@/common/utils/isValidFileType";

export default function AddAIBotKnowledgeWithFile() {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { addAlert } = useContext(AlertContext);
  const { hideModal } = useContext(ModalContext);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const fileList = e.dataTransfer.files;

    if (files.length + fileList.length >= 1000) {
      addAlert({
        type: "error",
        text: "파일은 최대 1000개 이하까지만 업로드 가능합니다.",
      });
      return;
    }

    for (const file of fileList) {
      if (file.size >= 100000000) {
        addAlert({
          type: "error",
          text: "최대 100MB 이하인 파일만 업로드 가능합니다.",
        });
        return;
      }
      if (!isValidFileType({ fileName: file.name, fileType: file.type })) {
        addAlert({
          type: "error",
          text: "지원하지 않는 파일 확장자입니다. 지원 확장자 목록: .pdf, .xlsx, .docx, .csv, .hwp",
        });
        return;
      }
    }

    setFiles((prev) => prev.concat([...fileList]));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    if (files.length + fileList.length >= 1000) {
      addAlert({
        type: "error",
        text: "파일은 최대 1000개 이하까지만 업로드 가능합니다.",
      });
      return;
    }

    for (const file of fileList) {
      if (file.size >= 100000000) {
        addAlert({
          type: "error",
          text: "최대 100MB 이하인 파일만 업로드 가능합니다.",
        });
        return;
      }
    }

    setFiles((prev) => prev.concat([...fileList]));
  };

  const handleChangeCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputList = files.map(
      (file, index) =>
        document.getElementById(`${file.name}-${index}`) as HTMLInputElement,
    );

    if (inputList.find((input) => input.checked)) {
      inputList.forEach((input) => (input.checked = false));
      e.target.checked = false;
      return;
    }

    inputList.forEach((input) => (input.checked = true));
    e.target.checked = true;
  };

  const handleClickDeleteFiles = () => {
    const inputObjList = files.map((file, index) => ({
      name: `${file.name}-${index}`,
      input: document.getElementById(
        `${file.name}-${index}`,
      ) as HTMLInputElement,
    }));

    const checkedInputObjList = inputObjList.filter((obj) => obj.input.checked);

    setFiles((prev) =>
      prev.filter(
        (file, index) =>
          !checkedInputObjList.find(
            (obj) => obj.name === `${file.name}-${index}`,
          ),
      ),
    );
  };

  const handleClickStartScraping = async () => {
    try {
      setIsCreating(true);
      if (!files.length) {
        addAlert({
          type: "error",
          text: "최소 1개 이상의 파일을 업로드해주세요.",
        });

        return;
      }

      addAlert({
        type: "ok",
        text: "컨텐츠를 추가중입니다! 최소 5분에서 20분가량 소요됩니다.",
      });

      const fileNames = files.map((file) => ({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
      }));

      const { signedUrls, taskUid } = await generateSignedUrls({
        fileNames,
        wsUid: workspaceId,
      });

      const promises = [];

      for (const file of files) {
        const fileName = file.name;
        promises.push(
          fetch(signedUrls[fileName], {
            method: "PUT",
            headers: {
              "Content-Type": file.type || "application/octet-stream",
            },
            body: file,
          }),
        );
      }

      await Promise.all(promises);

      await updateAIBotKnowledgeWithNewItem({
        file_reqData: [
          {
            fileNames,
          },
        ],
        taskUid,
        botClsUid: botId,
        wsUid: workspaceId,
      });
      hideModal();
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "콘텐츠 추가에 실패했습니다." });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-h-[100dvh] overflow-y-scroll">
      <div className="flex items-center justify-between border-b border-gray-lightest px-[20px] py-[16px]">
        <div className="text-lg text-black-normal">
          파일을 업로드 해서 챗봇 학습시키기
        </div>
      </div>
      <div className="flex flex-col gap-[16px] p-[20px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <div className="text-md">
              Try uploading the files <span className="text-red-normal">*</span>
            </div>
            <div className="text-sm">
              챗봇 생성을 위해 파일에서 콘텐츠를 가져옵니다. (파일 최대 1000개,
              개당 100MB 이하) <br /> 지원 확장자 목록: .pdf, .xlsx, .docx,
              .csv, .hwp
            </div>
          </div>
          <label
            className={`${isDragging ? "border-solid border-blue-normal text-blue-normal outline-blue-light" : "border-dashed border-gray-lighter text-gray-light"} h-[160px] overflow-hidden rounded-[8px] border-[1.5px] outline-[3px] hover:border-blue-normal hover:outline-blue-light`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center">
              {isDragging ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M9 4.5V6.5L4 6.5L4 18.5L20 18.5L20 6.5L15 6.5V4.5L21 4.5C21.5523 4.5 22 4.94772 22 5.5L22 19.5C22 20.0523 21.5523 20.5 21 20.5L3 20.5C2.4477 20.5 2 20.0523 2 19.5L2 5.5C2 4.94772 2.4477 4.5 3 4.5L9 4.5ZM13 10.5L16 10.5L12 15.5L8 10.5L11 10.5L11 2.5L13 2.5L13 10.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="text-md">여기에 드롭해주세요</div>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3.8 17.4H18.2V11.1H20V18.3C20 18.7971 19.5971 19.2 19.1 19.2H2.9C2.40295 19.2 2 18.7971 2 18.3V11.1H3.8V17.4ZM11.9 8.4V14.7H10.1V8.4H5.6L11 3L16.4 8.4H11.9Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="text-md">
                    클릭 또는 드래그 하여 올려주세요
                  </div>
                </>
              )}
            </div>
            <input
              id="dnd"
              type="file"
              multiple
              accept={getAcceptFileString()}
              className="hidden"
              onChange={handleChangeInput}
            />
          </label>
          <div className="flex items-center justify-between">
            <div className="text-sm">파일 {files.length}개</div>
            <button
              type="button"
              className="flex h-[24px] w-[24px] items-center justify-center"
              onClick={handleClickDeleteFiles}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M1 4.61111H15M6.25 7.72222V12.3889M9.75 7.72222V12.3889M1.875 4.61111L2.75 13.9444C2.75 14.357 2.93437 14.7527 3.26256 15.0444C3.59075 15.3361 4.03587 15.5 4.5 15.5H11.5C11.9641 15.5 12.4092 15.3361 12.7374 15.0444C13.0656 14.7527 13.25 14.357 13.25 13.9444L14.125 4.61111M5.375 4.61111V2.27778C5.375 2.0715 5.46719 1.87367 5.63128 1.72781C5.79538 1.58194 6.01794 1.5 6.25 1.5H9.75C9.98206 1.5 10.2046 1.58194 10.3687 1.72781C10.5328 1.87367 10.625 2.0715 10.625 2.27778V4.61111"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-[24px,minmax(300px,1fr),120px] items-center border-y border-gray-light bg-blue-lighter px-[12px] py-[4px]">
              <input
                id="check-all"
                type="checkbox"
                className="peer"
                hidden
                defaultChecked={false}
                onChange={handleChangeCheckAll}
              />
              <label
                htmlFor="check-all"
                className="flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-[1.5px] border-gray-light bg-white-normal text-white-normal peer-checked:border-gray-normal peer-checked:bg-gray-lightest peer-checked:text-gray-normal"
              >
                <svg
                  className="ml-[1px] mt-[1px] shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M3.53553 7.14215L0 3.60665L1.41421 2.19244L3.53553 4.31375L7.77821 0.0710449L9.19241 1.48524L3.53553 7.14215Z"
                    fill="currentColor"
                  />
                </svg>
              </label>
              <div className="truncate pl-[16px] text-sm">파일명</div>
              <div className="ml-auto truncate text-sm">크기</div>
            </div>
            <div className="h-[320px] overflow-y-auto">
              {files.map((file, index) => (
                <label
                  key={`${file.name}-${index}`}
                  htmlFor={`${file.name}-${index}`}
                  className="grid cursor-pointer grid-cols-[24px,minmax(300px,1fr),120px] items-center bg-white-normal px-[12px] py-[4px] hover:bg-blue-light"
                >
                  <input
                    id={`${file.name}-${index}`}
                    type="checkbox"
                    className="peer"
                    hidden
                    defaultChecked
                  />
                  <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-gray-light bg-white-normal text-white-normal peer-checked:border-gray-normal peer-checked:bg-gray-lightest peer-checked:text-gray-normal">
                    <svg
                      className="ml-[1px] mt-[1px] shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                    >
                      <path
                        d="M3.53553 7.14215L0 3.60665L1.41421 2.19244L3.53553 4.31375L7.77821 0.0710449L9.19241 1.48524L3.53553 7.14215Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="truncate pl-[16px] text-sm">{file.name}</div>
                  <div className="ml-auto truncate text-sm">
                    {formatFileSize(file.size)}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-[20px] py-[16px]">
        <button
          type="button"
          onClick={handleClickStartScraping}
          className="flex items-center gap-[12px] rounded-[8px] border border-gray-light px-[16px] py-[8px] hover:border-blue-normal hover:shadow-card disabled:cursor-wait"
          disabled={isCreating}
        >
          <div className="text-md">스크래핑 시작</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1.3335 3.99992H10.6668M10.6668 3.99992L8.00016 6.66659M10.6668 3.99992L8.00016 1.33325"
              stroke="#5C5C5C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
