"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { ModalContext } from "@/common/stores/ModalContext";
import { updateAIBotKnowledgeWithNewItem } from "@/domains/ai-chatbot/actions/updateAIBotKnowledgeWithNewItem";
import { isValidUrl } from "@/common/utils/isValidUrl";
import { ensureProtocol } from "@/common/utils/ensureProtocol";

export default function AddAIBotKnowledgeWithWeb() {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { addAlert } = useContext(AlertContext);
  const { hideModal } = useContext(ModalContext);
  const [startUrl, setStartUrl] = useState("");
  const [leafUrl, setLeafUrl] = useState("");
  const [scrapingAmount, setScrapingAmout] = useState("Small");
  const [isDropdownExpand, setIsDropdownExpand] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleChangeStartUrl = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setStartUrl(e.target.value);

  const handleChangeLeafUrl = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLeafUrl(e.target.value);

  const handleClickScrapingAmout = (e: React.MouseEvent<HTMLButtonElement>) =>
    setScrapingAmout(e.currentTarget.innerHTML);

  const handleExpandDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownExpand(true);
  };

  const handleFoldDropdown = () => setIsDropdownExpand(false);

  const handleClickStartScraping = async () => {
    try {
      setIsCreating(true);

      if (!startUrl && !leafUrl) {
        addAlert({
          type: "error",
          text: "최소 1개 이상의 URL을 입력해주세요.",
        });

        return;
      }

      const startUrls = startUrl
        .split(/\s*,\s*/)
        .filter((url) => url !== "")
        .map(ensureProtocol);
      const leafUrls = leafUrl
        .split(/\s*,\s*/)
        .filter((url) => url !== "")
        .map(ensureProtocol);

      const depthLimit = scrapingAmount === "Small" ? 1 : 3;
      const perPageLinkLimit = scrapingAmount === "Small" ? 20 : 100;

      if (startUrl) {
        for (const url of startUrls) {
          if (!isValidUrl(url)) {
            addAlert({
              type: "error",
              text: "URL을 정확하게 입력 혹은 콤마(,)로 구분했는지 확인해주세요.",
            });
            return;
          }
        }
      }

      if (leafUrl) {
        for (const url of leafUrls) {
          if (!isValidUrl(url)) {
            addAlert({
              type: "error",
              text: "URL을 정확하게 입력 혹은 콤마(,)로 구분했는지 확인해주세요.",
            });
            return;
          }
        }
      }

      addAlert({
        type: "ok",
        text: "컨텐츠를 추가중입니다! 최소 5분에서 20분가량 소요됩니다.",
      });

      await updateAIBotKnowledgeWithNewItem({
        web_reqData: [
          {
            startUrls,
            leafUrls,
            allowedDomains: [
              ...startUrls.map((url) => new URL(url).hostname),
              ...leafUrls.map((url) => new URL(url).hostname),
            ],
            depthLimit,
            perPageLinkLimit,
          },
        ],
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

  useEffect(() => {
    window.document.addEventListener("mousedown", handleFoldDropdown);
    return () =>
      window.document.removeEventListener("mousedown", handleFoldDropdown);
  }, []);

  return (
    <div className="max-h-[100dvh] overflow-y-scroll">
      <div className="flex items-center justify-between border-b border-gray-lightest px-[20px] py-[16px]">
        <div className="text-lg text-black-normal">
          URL을 입력해서 챗봇 학습시키기
        </div>
      </div>
      <div className="flex flex-col gap-[16px] p-[20px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <div className="text-md">
              Start URLs <span className="text-red-normal">*</span>
            </div>
            <div className="text-sm">
              입력한 URL의 웹페이지를 포함한 하위의 모든 웹페이지 컨텐츠를
              가져옵니다. URL을 콤마(,)로 구분해주세요.
            </div>
          </div>
          <div className="h-[160px] overflow-hidden rounded-[8px] border-[1.5px] border-gray-lighter outline-[3px] focus-within:border-blue-normal focus-within:outline-blue-light hover:border-blue-normal hover:outline-blue-light">
            <textarea
              className="h-full w-full resize-none p-[12px] outline-none placeholder:text-gray-light"
              value={startUrl}
              onChange={handleChangeStartUrl}
              placeholder="https://example1.com, http://example2.com, etc"
              contentEditable
            />
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <div className="text-md">단위 URLs</div>
            <div className="text-sm">
              하위 컨텐츠 수집 없이, 해당 URLs의 웹페이지 콘텐츠만 가져옵니다.
              URL을 콤마(,)로 구분해주세요.
            </div>
          </div>
          <div className="h-[160px] overflow-hidden rounded-[8px] border-[1.5px] border-gray-lighter outline-[3px] focus-within:border-blue-normal focus-within:outline-blue-light hover:border-blue-normal hover:outline-blue-light">
            <textarea
              className="h-full w-full resize-none p-[12px] outline-none placeholder:text-gray-light"
              value={leafUrl}
              onChange={handleChangeLeafUrl}
              placeholder="https://example.com/about, http://example.com/support, etc"
              contentEditable
            />
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col">
            <div className="text-md">스크래핑 양</div>
            <div className="text-sm">
              Small: 적은 양의 페이지를 수집하지만 빠릅니다.
            </div>
            <div className="text-sm">
              Large: 많은 양의 페이지를 수집하는 만큼 시간이 더 소요됩니다.
            </div>
          </div>
          <div className="flex flex-col gap-[4px] self-start">
            <button
              type="button"
              className="flex items-center gap-[12px] rounded-[8px] border border-gray-lighter bg-white-normal px-[12px] py-[8px]"
              onClick={handleExpandDropdown}
            >
              <div className="text-md">{scrapingAmount}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
              >
                <path
                  d="M4 5.51393L0 1.51393L1.02809 0.48584L4 3.45775L6.97191 0.48584L8 1.51393L4 5.51393Z"
                  fill="#5C5C5C"
                />
              </svg>
            </button>
            <div
              className={`${isDropdownExpand ? "visible opacity-100" : "invisible opacity-0"} flex flex-col gap-[4px] rounded-[8px] bg-white-normal p-[4px] shadow-card transition-[opacity,visibility]`}
            >
              <button
                type="button"
                className="rounded-[4px] bg-white-normal px-[8px] py-[4px] text-start text-md hover:bg-blue-normal hover:text-white-normal"
                onClick={handleClickScrapingAmout}
              >
                Small
              </button>
              <button
                type="button"
                className="rounded-[4px] bg-white-normal px-[8px] py-[4px] text-start text-md hover:bg-blue-normal hover:text-white-normal"
                onClick={handleClickScrapingAmout}
              >
                Large
              </button>
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
