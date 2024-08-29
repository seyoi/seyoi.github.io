"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { formatTime } from "@/common/utils/formatTime";
import { AlertContext } from "@/common/stores/AlertContext";
import { PopUpContext } from "@/common/stores/PopUpContext";
import { getAIBotKnowledgeItem } from "@/domains/ai-chatbot/actions/getAIBotKnowledgeItem";
import { updateAIBotKnowledgeItem } from "@/domains/ai-chatbot/actions/updateAIBotKnowledgeItem";
import type {
  AIBotKnowledgeDTO,
  AIBotKnowledgeItemStatus,
} from "@/server/types/AIBotKnowledge";
import { LoadingSpinner } from "@/common/components/LoadingSpinner";
import { SheetContext } from "@/common/stores/SheetContext";

export default function AIBotKnowledgeContent() {
  const {
    workspaceId,
    botId,
    itemUid,
  }: { workspaceId: string; botId: string; itemUid: string } = useParams();
  const { addAlert } = useContext(AlertContext);
  const { showPopUp } = useContext(PopUpContext);
  const { hideSheet } = useContext(SheetContext);
  const [aiBotKnowledge, setAiBotKnowledge] = useState<AIBotKnowledgeDTO>();
  const aiBotKnowledgeItem = aiBotKnowledge?.itemSelections?.[0];
  const [draftTitle, setDraftTitle] = useState("");
  const [draftPageContent, setDraftPageContent] = useState("");
  const [draftStatus, setDraftStatus] =
    useState<AIBotKnowledgeItemStatus>("UNUSED");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAIBotKnowledgeItem = async () => {
      try {
        setIsLoading(true);
        const aiBotKnowledge = await getAIBotKnowledgeItem({
          botClsUid: botId,
          wsUid: workspaceId,
          itemUid,
        });
        setAiBotKnowledge(aiBotKnowledge);
        setDraftTitle(aiBotKnowledge?.itemSelections?.[0].title || "");
        setDraftPageContent(
          aiBotKnowledge?.itemSelections?.[0].modified_pageContent || "",
        );
        setDraftStatus(aiBotKnowledge?.itemSelections?.[0].status || "UNUSED");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAIBotKnowledgeItem();
  }, [botId, workspaceId, itemUid]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraftTitle(e.target.value);

  const handleChangePageContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDraftPageContent(e.target.value);

  const handleKeydownTitle = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    try {
      if (e.nativeEvent.isComposing) return;

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.blur();

        if (!draftTitle) {
          addAlert({ type: "error", text: "변경할 타이틀을 입력해주세요!" });
          return;
        }

        addAlert({
          type: "ok",
          text: "콘텐츠 업데이트중입니다. 잠시만 기다려주세요.",
        });

        if (!aiBotKnowledge) throw "handleKeydownTitle: no aiBotKnowledge";

        if (!aiBotKnowledge.wsUid) throw "handleKeydownTitle: no wsUid";

        if (!aiBotKnowledgeItem)
          throw "handleKeydownTitle: no aiBotKnowledgeItem";

        await updateAIBotKnowledgeItem({
          botClsUid: botId,
          itemUid: aiBotKnowledgeItem.itemuid,
          wsUid: aiBotKnowledge.wsUid,
          acntUid: aiBotKnowledge.acntUid,
          draftTitle,
        });

        addAlert({
          type: "ok",
          text: "콘텐츠 변경에 성공했습니다.",
        });
      }
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "콘텐츠 변경에 실패했습니다." });
    }
  };

  const handleKeydownPageContent = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    try {
      if (e.nativeEvent.isComposing) return;

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.blur();

        if (!draftPageContent) {
          addAlert({ type: "error", text: "변경할 내용을 입력해주세요!" });
          return;
        }

        addAlert({
          type: "ok",
          text: "콘텐츠 업데이트중입니다. 잠시만 기다려주세요.",
        });

        if (!aiBotKnowledge)
          throw "handleKeydownPageContent: no aiBotKnowledge";

        if (!aiBotKnowledge.wsUid) throw "handleKeydownPageContent: no wsUid";

        if (!aiBotKnowledgeItem)
          throw "handleKeydownPageContent: no aiBotKnowledgeItem";

        await updateAIBotKnowledgeItem({
          botClsUid: botId,
          itemUid: aiBotKnowledgeItem.itemuid,
          wsUid: aiBotKnowledge.wsUid,
          acntUid: aiBotKnowledge.acntUid,
          draftPageContent,
        });

        addAlert({
          type: "ok",
          text: "콘텐츠 변경에 성공했습니다.",
        });
      }
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "콘텐츠 변경에 실패했습니다." });
    }
  };

  const updateItemStatus = async (status: AIBotKnowledgeItemStatus) => {
    try {
      if (!aiBotKnowledge) throw "handleUsedClick: no aiBotKnowledge";

      if (!aiBotKnowledge.wsUid) throw "handleUsedClick: no wsUid";

      if (!aiBotKnowledgeItem) throw "handleUsedClick: no aiBotKnowledgeItem";

      addAlert({ type: "ok", text: "업데이트중입니다. 잠시만 기다려주세요." });

      setDraftStatus(status);

      await updateAIBotKnowledgeItem({
        botClsUid: botId,
        itemUid: aiBotKnowledgeItem.itemuid,
        wsUid: aiBotKnowledge.wsUid,
        acntUid: aiBotKnowledge.acntUid,
        draftStatus: status,
      });

      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  const handleDeleteClick = () => {
    showPopUp({
      title: "콘텐츠를 삭제하시겠습니까?",
      subTitle:
        "선택한 콘텐츠 관련 데이터는 영구적으로 삭제되고, 이 동작은 되돌릴 수 없습니다.",
      actionType: "delete",
      action: async () => {
        await updateItemStatus("DELETE");
        hideSheet();
      },
    });
  };

  if (isLoading)
    return (
      <div className="h-full w-full flex-col bg-white-normal">
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner color="#416BFF" size="32px" borderWidth="4px" />
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col bg-white-normal">
      <div className="flex items-center justify-between border-b border-gray-lightest px-[20px] py-[16px]">
        <div className="text-lg text-black-normal">콘텐츠 보기</div>
      </div>
      <div className="flex flex-1 flex-col px-[20px] py-[16px]">
        <div className="flex flex-col gap-[16px]">
          <div className="grid grid-cols-[120px,minmax(0,1fr)] items-start">
            <div className="mt-[11px] text-md text-gray-light">콘텐츠 이름</div>
            <div className="relative flex flex-col gap-[4px]">
              <input
                className="h-full w-full resize-none overflow-y-auto rounded-[8px] border-[3px] border-transparent px-[12px] py-[8px] text-md outline-[3px] outline-transparent focus:border-blue-normal focus:bg-gray-lightest focus:outline-blue-light"
                placeholder="텍스트를입력해주세요"
                value={draftTitle!}
                onChange={handleChangeTitle}
                onKeyDown={handleKeydownTitle}
              ></input>
            </div>
          </div>
          {/* {aiBotKnowledgeItem?.type === "scraped" && (
            <div className="grid grid-cols-[120px,minmax(0,1fr)]">
              <div className="text-md text-gray-light">콘텐츠 출처</div>
              <Link
                href={aiBotKnowledgeItem.itemuid}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words px-[12px] text-md hover:text-blue-normal hover:underline"
              >
                {aiBotKnowledgeItem.itemuid}
              </Link>
            </div>
          )} */}
          <div className="grid grid-cols-[120px,minmax(0,1fr)] items-center">
            <div className="text-md text-gray-light">마지막 업데이트</div>
            <div className="px-[12px] text-md">
              {formatTime(aiBotKnowledgeItem?.updatedAt || new Date())}
            </div>
          </div>
          <div className="grid grid-cols-[120px,minmax(0,1fr)] items-center">
            <div className="text-md text-gray-light">콘텐츠 타입</div>
            {aiBotKnowledgeItem?.type === "scraped" && (
              <div className="flex items-center gap-[4px] px-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M12.2429 10.857L11.3001 9.91423L12.2429 8.97143C13.5447 7.6697 13.5447 5.55914 12.2429 4.2574C10.9411 2.95565 8.83061 2.95565 7.52888 4.2574L6.58607 5.20021L5.64326 4.2574L6.58607 3.31459C8.40855 1.49214 11.3633 1.49214 13.1857 3.31459C15.0081 5.13704 15.0081 8.09183 13.1857 9.91423L12.2429 10.857ZM10.3573 12.7427L9.41448 13.6855C7.59208 15.508 4.63728 15.508 2.81483 13.6855C0.992386 11.863 0.992386 8.9083 2.81483 7.08582L3.75764 6.14302L4.70045 7.08582L3.75764 8.02863C2.45589 9.33036 2.45589 11.441 3.75764 12.7427C5.05939 14.0444 7.16995 14.0444 8.47168 12.7427L9.41448 11.7999L10.3573 12.7427ZM9.88588 5.67161L10.8287 6.61442L6.11466 11.3285L5.17185 10.3856L9.88588 5.67161Z"
                    fill="#5C5C5C"
                  />
                </svg>
                <div>Website</div>
              </div>
            )}
            {aiBotKnowledgeItem?.type === "uploaded" && (
              <div className="flex items-center gap-[4px] px-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M9.35981 4.62847L5.11713 8.87115C4.82423 9.16402 4.82423 9.63885 5.11713 9.9318C5.41002 10.2247 5.88491 10.2247 6.17778 9.9318L10.4205 5.68913C11.2991 4.81045 11.2991 3.38584 10.4205 2.50715C9.54176 1.62847 8.11713 1.62847 7.23843 2.50715L2.99581 6.74977C1.53134 8.21422 1.53134 10.5886 2.99581 12.0531C4.46027 13.5175 6.83463 13.5175 8.29908 12.0531L12.5418 7.81042L13.6024 8.87115L9.35981 13.1137C7.30953 15.164 3.9854 15.164 1.93515 13.1137C-0.115102 11.0635 -0.115102 7.7394 1.93515 5.68913L6.17778 1.44649C7.64223 -0.0179717 10.0167 -0.0179717 11.4811 1.44649C12.9456 2.91096 12.9456 5.28533 11.4811 6.74977L7.23843 10.9924C6.35981 11.8711 4.93515 11.8711 4.05647 10.9924C3.17779 10.1137 3.17779 8.68912 4.05647 7.81042L8.29908 3.56782L9.35981 4.62847Z"
                    fill="#5C5C5C"
                  />
                </svg>
                <div>File</div>
              </div>
            )}
            {aiBotKnowledgeItem?.type === "written" && (
              <div className="flex items-center gap-[4px] px-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="none"
                >
                  <path
                    d="M5.33333 2.16683V12.1668H4V2.16683H0V0.833496H9.33333V2.16683H5.33333Z"
                    fill="#5C5C5C"
                  />
                </svg>
                <div>Text</div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-[120px,minmax(0,1fr)] items-center">
            <div className="text-md text-gray-light">상태</div>
            <div className="flex px-[12px]">
              <div className="flex items-center gap-[4px] rounded-[40px] bg-white-normal p-[4px] shadow-card">
                <button
                  type="button"
                  className={`${draftStatus === "USED" ? "bg-green-light text-green-dark" : "text-gray-normal"} rounded-[40px] px-[8px] text-sm`}
                  onClick={() => updateItemStatus("USED")}
                >
                  사용중
                </button>
                <button
                  type="button"
                  className={`${draftStatus === "UNUSED" ? "bg-gray-lightest text-gray-normal" : "text-gray-normal"} rounded-[40px] px-[8px] text-sm`}
                  onClick={() => updateItemStatus("UNUSED")}
                >
                  사용 안함
                </button>
                <button
                  type="button"
                  className="rounded-[40px] px-[8px] text-sm text-gray-normal hover:bg-red-normal hover:text-white-normal"
                  onClick={handleDeleteClick}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
        <textarea
          className="my-[20px] h-full w-full resize-none overflow-y-auto rounded-[8px] border-[3px] border-transparent px-[12px] py-[8px] pr-[20px] text-md outline-[3px] outline-transparent focus:border-blue-normal focus:bg-gray-lightest focus:outline-blue-light"
          placeholder="텍스트를입력해주세요"
          value={draftPageContent!}
          onChange={handleChangePageContent}
          onKeyDown={handleKeydownPageContent}
        ></textarea>
      </div>
    </div>
  );
}
