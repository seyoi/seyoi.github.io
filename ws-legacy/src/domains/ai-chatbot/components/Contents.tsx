"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { PopUpContext } from "@/common/stores/PopUpContext";
import { updateAIBotKnowledge } from "../actions/updateAIBotKnowledge";
import { formatTime } from "@/common/utils/formatTime";
import { LoadingSpinner } from "@/common/components/LoadingSpinner";
import type { AIBotDTO } from "@/server/types/AIBot";
import type {
  AIBotKnowledgeDTO,
  AIBotKnowledgeItemStatus,
} from "@/server/types/AIBotKnowledge";

export default function Contents({
  initialAIBot: aiBot,
  initialAIBotKnowledge: aiBotKnowledge,
}: {
  initialAIBot?: AIBotDTO;
  initialAIBotKnowledge?: AIBotKnowledgeDTO;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addAlert } = useContext(AlertContext);
  const { showPopUp } = useContext(PopUpContext);
  const [search, setSearch] = useState("");

  const searchItemKey = searchParams.get("searchItemKey");
  const searchItemUid = searchParams.get("searchItemUid");
  const filteredAiBotKnowledgeItems = aiBotKnowledge?.itemSelections
    ?.filter(
      (content) =>
        content.title?.includes(search) || content.itemuid.includes(search),
    )
    .sort((a, b) => {
      if (a.updatedAt && b.updatedAt)
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      return 1;
    });

  const handleChangeCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputList = filteredAiBotKnowledgeItems?.map(
      (item) => document.getElementById(`${item.itemuid}`) as HTMLInputElement,
    );

    if (inputList?.find((input) => input.checked)) {
      inputList.forEach((input) => (input.checked = false));
      e.target.checked = false;
      return;
    }

    inputList?.forEach((input) => (input.checked = true));
    e.target.checked = true;
  };

  const getCheckedItems = () => {
    return filteredAiBotKnowledgeItems
      ?.map((item) => ({
        input: document.getElementById(`${item.itemuid}`) as HTMLInputElement,
        item,
      }))
      .filter((mappedItem) => mappedItem.input.checked)
      .map((checkedItem) => ({ ...checkedItem.item }));
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const updateItemsStatus = async (status: AIBotKnowledgeItemStatus) => {
    try {
      const checkedItems = getCheckedItems();

      if (checkedItems?.length === 0) {
        addAlert({
          type: "error",
          text: "상태 업데이트를 위해 최소 1개 이상의 콘텐츠를 선택해주세요.",
        });
        return;
      }

      addAlert({ type: "ok", text: "업데이트중입니다. 잠시만 기다려주세요." });

      const used_itemuids =
        (status === "USED" && checkedItems?.map((item) => item.itemuid)) ||
        undefined;

      const unused_itemuids =
        (status === "UNUSED" && checkedItems?.map((item) => item.itemuid)) ||
        undefined;

      const deleted_itemuids =
        (status === "DELETE" && checkedItems?.map((item) => item.itemuid)) ||
        undefined;

      await updateAIBotKnowledge({
        botClsUid: aiBot?.uid,
        aiBotKnowledge,
        used_itemuids,
        unused_itemuids,
        deleted_itemuids,
      });

      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  const handleClickDelete = () => {
    showPopUp({
      title: "콘텐츠를 삭제하시겠습니까?",
      subTitle:
        "선택한 콘텐츠 관련 데이터는 영구적으로 삭제되고, 이 동작은 되돌릴 수 없습니다.",
      actionType: "delete",
      action: async () => await updateItemsStatus("DELETE"),
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (aiBot?.status !== "BOTCLS_SUCCEEDED")
      timer = setInterval(() => {
        router.refresh();
      }, 10000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiBot?.status]);

  useEffect(() => {
    const findItem = filteredAiBotKnowledgeItems?.find(
      (item) => item.itemkey === searchItemKey,
    );

    if (findItem) router.replace(`${pathname}?itemUid=${findItem.itemuid}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAiBotKnowledgeItems, pathname, searchItemKey]);

  useEffect(() => {
    const findItem = filteredAiBotKnowledgeItems?.find(
      (item) => item.itemuid === searchItemUid,
    );

    if (findItem) router.replace(`${pathname}?itemUid=${findItem.itemuid}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAiBotKnowledgeItems, pathname, searchItemUid]);

  return (
    <div className="flex h-[calc(100dvh-90px)] min-w-0 flex-col bg-blue-lighter">
      <div className="flex h-full flex-col">
        {aiBot?.status !== "BOTCLS_SUCCEEDED" && (
          <div className="flex items-center gap-[8px] bg-green-light p-[20px]">
            <div className="text-md">
              봇 콘텐츠를 업데이트중입니다. 잠시만 기다려주세요. 최소 5분에서
              최대 20분 가량 소요됩니다.
            </div>
            <LoadingSpinner size="16px" borderWidth="3px" color="#416BFF" />
          </div>
        )}
        <div className="flex items-center justify-between p-[20px] pb-[0px]">
          <div className="flex items-center">
            <div className="p-[8px] text-lg">
              총 {filteredAiBotKnowledgeItems?.length}개
            </div>
            <div className="flex items-center gap-[4px] rounded-[40px] bg-white-normal p-[4px]">
              <button
                type="button"
                className="rounded-[40px] px-[8px] text-sm text-gray-normal hover:bg-green-light hover:text-green-dark"
                onClick={() => updateItemsStatus("USED")}
              >
                사용중
              </button>
              <button
                type="button"
                className="rounded-[40px] px-[8px] text-sm text-gray-normal hover:bg-gray-lightest hover:text-gray-normal"
                onClick={() => updateItemsStatus("UNUSED")}
              >
                사용 안함
              </button>
              <button
                type="button"
                className="rounded-[40px] px-[8px] text-sm text-gray-normal hover:bg-red-normal hover:text-white-normal"
                onClick={handleClickDelete}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="outline-3px rounded-[8px] border-[1.5px] border-gray-light bg-white-normal px-[12px] py-[8px] focus-within:border-blue-normal focus-within:outline-blue-light hover:border-blue-normal hover:outline-blue-light">
            <input
              placeholder="콘텐츠 이름 검색"
              className="w-full text-md outline-none"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden p-[20px]">
          <div className="grid grid-cols-[24px,minmax(180px,1fr),120px,120px,120px,120px] items-center border-b border-gray-light bg-blue-lighter px-[12px] py-[8px]">
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
            <div className="truncate pl-[16px] text-sm">이름</div>
            <div className="truncate pl-[16px] text-sm">상태</div>
            <div className="truncate pl-[16px] text-sm">데이터 타입</div>
            <div className="truncate pl-[16px] text-sm">마지막 업데이트</div>
          </div>
          <div className="flex flex-col overflow-y-auto">
            {filteredAiBotKnowledgeItems?.map((item) => (
              <label
                key={`${item.itemuid}`}
                htmlFor={`${item.itemuid}`}
                className="grid cursor-pointer grid-cols-[24px,minmax(180px,1fr),120px,120px,120px,120px] items-center border-b border-gray-light bg-white-normal px-[12px] py-[8px] hover:bg-blue-light"
              >
                <input
                  id={`${item.itemuid}`}
                  type="checkbox"
                  className="peer"
                  defaultChecked={false}
                  hidden
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
                <div className="truncate pl-[16px] text-md">
                  {item.title && (
                    <div>
                      <span>{item.title}</span>{" "}
                      <span className="text-sm text-gray-normal">from</span>{" "}
                      <span className="text-sm text-gray-normal">
                        {item.itemuid}
                      </span>
                    </div>
                  )}
                  {!item.title && item.itemuid}
                </div>
                <div className="mr-auto pl-[16px]">
                  {item.status === "USED" && (
                    <div className="truncate rounded-[4px] bg-green-light px-[8px] py-[4px] text-sm text-green-dark">
                      사용중
                    </div>
                  )}
                  {item.status === "UNUSED" && (
                    <div className="truncate rounded-[4px] bg-gray-lightest px-[8px] py-[4px] text-sm text-gray-normal">
                      사용 안함
                    </div>
                  )}
                </div>
                <div className="truncate pl-[16px] text-sm">
                  {item.type === "scraped" && (
                    <div className="flex items-center gap-[4px]">
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
                  {item.type === "uploaded" && (
                    <div className="flex items-center gap-[4px]">
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
                  {item.type === "written" && (
                    <div className="flex items-center gap-[4px]">
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
                <div className="truncate pl-[16px] text-sm">
                  {formatTime(item.updatedAt)}
                </div>
                <Link
                  href={`/workspaces/${aiBot?.wsUid}/ai-chatbots/${aiBot?.uid}/contents/i/${item.itemuid}`}
                  className="ml-auto flex h-[24px] w-[24px] items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M3.82351 4.76478H2.88234C2.38311 4.76478 1.90433 4.9631 1.55132 5.31611C1.19832 5.66912 1 6.1479 1 6.64712V15.1177C1 15.6169 1.19832 16.0957 1.55132 16.4487C1.90433 16.8017 2.38311 17 2.88234 17H11.3529C11.8521 17 12.3309 16.8017 12.6839 16.4487C13.0369 16.0957 13.2352 15.6169 13.2352 15.1177V14.1765M12.294 2.88244L15.1176 5.70595M16.4211 4.3742C16.7918 4.00352 17 3.50077 17 2.97656C17 2.45234 16.7918 1.9496 16.4211 1.57892C16.0504 1.20824 15.5477 1 15.0234 1C14.4992 1 13.9965 1.20824 13.6258 1.57892L5.70585 9.47064V12.2941H8.52936L16.4211 4.3742Z"
                      stroke="#5C5C5C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
