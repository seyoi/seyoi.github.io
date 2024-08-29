"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext } from "react";
import { PopUpContext } from "@/common/stores/PopUpContext";
import { deleteBot } from "../actions/deleteBot";

export default function AIChatbotSidebar({
  botName,
}: {
  botName: string | undefined;
}) {
  const pathname = usePathname();
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { showPopUp } = useContext(PopUpContext);

  const handleDeleteClick = () => {
    showPopUp({
      title: "챗봇을 삭제하시겠습니까?",
      subTitle: "삭제하시면 대화 내용 및 모든 파일이 삭제됩니다.",
      actionType: "delete",
      action: async () => await deleteBot({ workspaceId, botId }),
    });
  };

  return (
    <div className="sticky left-0 flex max-h-[100dvh] flex-col gap-[16px] border-r border-gray-lightest bg-white-normal p-[20px]">
      <div className="text-lg">{botName}</div>
      <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto">
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/contents`}
          className={`${
            new RegExp(/\/workspaces\/.*\/ai-chatbots\/.*\/contents.*/).test(
              pathname,
            )
              ? "bg-blue-light text-blue-dark"
              : "bg-white-normal"
          } rounded-[4px] px-[8px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
        >
          콘텐츠 관리
        </Link>
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/faq`}
          className={`${
            new RegExp(/\/workspaces\/.*\/ai-chatbots\/.*\/faq.*/).test(
              pathname,
            )
              ? "bg-blue-light text-blue-dark"
              : "bg-white-normal"
          } rounded-[4px] px-[8px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
        >
          FAQ 설정
        </Link>
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/prompt`}
          className={`${
            new RegExp(/\/workspaces\/.*\/ai-chatbots\/.*\/prompt.*/).test(
              pathname,
            )
              ? "bg-blue-light text-blue-dark"
              : "bg-white-normal"
          } rounded-[4px] px-[8px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
        >
          프롬프트 설정
        </Link>
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/model`}
          className={`${
            new RegExp(/\/workspaces\/.*\/ai-chatbots\/.*\/model.*/).test(
              pathname,
            )
              ? "bg-blue-light text-blue-dark"
              : "bg-white-normal"
          } rounded-[4px] px-[8px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
        >
          LLM 모델 설정
        </Link>
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/profile`}
          className={`${
            new RegExp(/\/workspaces\/.*\/ai-chatbots\/.*\/settings.*/).test(
              pathname,
            )
              ? "text-blue-dark"
              : "bg-white-normal"
          } rounded-[4px] px-[8px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
        >
          챗봇 설정
        </Link>
        {new RegExp(/\/workspaces\/.*\/ai-chatbots\/.*\/settings.*/).test(
          pathname,
        ) && (
          <>
            <Link
              href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/profile`}
              className={`${
                new RegExp(
                  /\/workspaces\/.*\/ai-chatbots\/.*\/settings\/profile/,
                ).test(pathname)
                  ? "bg-blue-light text-blue-dark"
                  : "bg-white-normal"
              } rounded-[4px] px-[12px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
            >
              프로필 설정
            </Link>
            <Link
              href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/button`}
              className={`${
                new RegExp(
                  /\/workspaces\/.*\/ai-chatbots\/.*\/settings\/button/,
                ).test(pathname)
                  ? "bg-blue-light text-blue-dark"
                  : "bg-white-normal"
              } rounded-[4px] px-[12px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
            >
              버튼 설정
            </Link>
            <Link
              href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/settings/install`}
              className={`${
                new RegExp(
                  /\/workspaces\/.*\/ai-chatbots\/.*\/settings\/install/,
                ).test(pathname)
                  ? "bg-blue-light text-blue-dark"
                  : "bg-white-normal"
              } rounded-[4px] px-[12px] py-[4px] text-md hover:bg-blue-light hover:text-blue-dark`}
            >
              버튼 설치
            </Link>
          </>
        )}
      </div>
      <button
        type="button"
        className="flex items-center gap-[8px] rounded-[4px] px-[8px] py-[4px] text-md"
        onClick={handleDeleteClick}
      >
        <div className="flex h-[16px] w-[16px] items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M1 4.61111H15M6.25 7.72222V12.3889M9.75 7.72222V12.3889M1.875 4.61111L2.75 13.9444C2.75 14.357 2.93437 14.7527 3.26256 15.0444C3.59075 15.3361 4.03587 15.5 4.5 15.5H11.5C11.9641 15.5 12.4092 15.3361 12.7374 15.0444C13.0656 14.7527 13.25 14.357 13.25 13.9444L14.125 4.61111M5.375 4.61111V2.27778C5.375 2.0715 5.46719 1.87367 5.63128 1.72781C5.79538 1.58194 6.01794 1.5 6.25 1.5H9.75C9.98206 1.5 10.2046 1.58194 10.3687 1.72781C10.5328 1.87367 10.625 2.0715 10.625 2.27778V4.61111"
              stroke="#FF5C5C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-md text-red-normal">챗봇 삭제</div>
      </button>
    </div>
  );
}
