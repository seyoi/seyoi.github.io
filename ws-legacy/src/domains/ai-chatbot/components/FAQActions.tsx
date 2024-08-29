"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { WorkspaceContext } from "@/domains/workspace/stores/WorkspaceContext";
import { generateSignedUrlsForFaq } from "../actions/generateSignedUrlsForFaq";
import { deleteFaq } from "../actions/deleteFaq";
import { createFaq } from "../actions/createFaq";
import Link from "next/link";

export default function FAQActions({
  rootNodeIds,
}: {
  rootNodeIds?: string[];
}) {
  const { botId }: { botId: string } = useParams();
  const { addAlert } = useContext(AlertContext);
  const { workspace } = useContext(WorkspaceContext);

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!workspace) throw "handleUploadClick: no workspace";

      addAlert({
        type: "ok",
        text: "FAQ 생성을 위해 초기화중입니다. 잠시만 기다려주세요!",
      });

      if (rootNodeIds) {
        for (const rootNodeId of rootNodeIds) {
          await deleteFaq({
            wsUid: workspace.id,
            bot_class_uid: botId,
            qa_node_uid: rootNodeId,
          });
        }
      }

      const fileList = e.target.files;

      if (!fileList) return;

      const files = [...fileList];

      const fileNames = files.map((file) => ({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
      }));

      addAlert({
        type: "ok",
        text: "FAQ를 생성중입니다.",
      });

      const { signedUrls, taskUid } = await generateSignedUrlsForFaq({
        wsUid: workspace.id,
        fileNames,
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

      await createFaq({
        fileNames,
        wsUid: workspace.id,
        taskUid,
        botClsUid: botId,
      });

      addAlert({
        type: "ok",
        text: "FAQ가 생성됐습니다.",
      });
    } catch (err) {
      console.error(err);
      addAlert({
        type: "error",
        text: "FAQ 생성에 실패했습니다.",
      });
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="flex min-w-0 flex-col justify-between border-b border-gray-lightest p-[20px]">
      <div className="flex items-center gap-[12px]">
        <div className="flex flex-col">
          <div className="text-lg">
            엑셀파일과 동기화하여 손쉽게 질문과 답변을 만드세요. (최대 12개)
          </div>
          <div className="whitespace-nowrap text-sm text-gray-normal">
            고객이 봇과 채팅할 때 받게 되는 예상 질문과 답변입니다.
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <Link
          href="https://bin.docenty.ai/pri-files/%5B%E1%84%8C%E1%85%AE%E1%84%8B%E1%85%B4%5D%E1%84%80%E1%85%A5%E1%86%B7%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%89%E1%85%A6%E1%86%AF%E1%84%8B%E1%85%B3%E1%86%AB%20%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%92%E1%85%A1%E1%84%8C%E1%85%B5%20%E1%84%86%E1%85%A1%E1%84%89%E1%85%A6%E1%84%8B%E1%85%AD!-DocentyAI%20FAQ%20List-14Aug2024.xlsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-black-lightest px-[16px] py-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M2.66675 11.8327V13.166C2.66675 13.5196 2.80722 13.8588 3.05727 14.1088C3.30732 14.3589 3.64646 14.4993 4.00008 14.4993H12.0001C12.3537 14.4993 12.6928 14.3589 12.9429 14.1088C13.1929 13.8588 13.3334 13.5196 13.3334 13.166V11.8327M4.66675 7.83268L8.00008 11.166M8.00008 11.166L11.3334 7.83268M8.00008 11.166V3.16602"
                stroke="#A6A6A6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-md text-gray-light">템플릿 다운로드</div>
          </div>
        </Link>
        <label
          htmlFor="upload"
          className="flex cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-blue-normal px-[16px] py-[8px]"
        >
          <input
            id="upload"
            type="file"
            onChange={handleChangeInput}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            hidden
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
          >
            <path
              d="M12.3334 5.83249C12.1704 4.6593 11.6261 3.57226 10.7845 2.73882C9.94289 1.90537 8.85059 1.37177 7.67586 1.22019C6.50114 1.06861 5.30916 1.30747 4.28355 1.89998C3.25793 2.49249 2.45558 3.40578 2.00008 4.49915M1.66675 1.83249V4.49915H4.33341M1.66675 7.16581C1.82979 8.339 2.37404 9.42604 3.21566 10.2595C4.05728 11.0929 5.14958 11.6265 6.3243 11.7781C7.49902 11.9297 8.691 11.6908 9.71661 11.0983C10.7422 10.5058 11.5446 9.59252 12.0001 8.49915M12.3334 11.1658V8.49915H9.66675"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="whitespace-nowrap text-md text-white-normal">
            동기화
          </div>
        </label>
      </div>
    </div>
  );
}
