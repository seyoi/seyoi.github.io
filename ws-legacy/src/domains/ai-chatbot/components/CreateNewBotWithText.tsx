"use client";

import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { createBot } from "@/domains/ai-chatbot/actions/createBot";

export default function CreateNewBotWithText() {
  const { workspaceId }: { workspaceId: string } = useParams();
  const { addAlert } = useContext(AlertContext);
  const [text, setText] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleClickStartScraping = async () => {
    try {
      setIsCreating(true);

      if (!text) {
        addAlert({ type: "error", text: "내용을 입력해주세요." });
        return;
      }

      addAlert({
        type: "ok",
        text: "챗봇을 생성중입니다! 최소 5분에서 20분가량 소요됩니다.",
      });

      await createBot({
        workspaceId,
        text_reqData: [{ texts: text }],
      });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "챗봇 생성에 실패했습니다." });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-h-[100dvh] overflow-y-scroll">
      <div className="flex items-center justify-between border-b border-gray-lightest px-[20px] py-[16px]">
        <div className="text-lg text-black-normal">
          텍스트를 입력해서 챗봇 생성하기
        </div>
      </div>
      <div className="flex flex-col gap-[16px] p-[20px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <div className="text-md">
              Please enter text <span className="text-red-normal">*</span>
            </div>
            <div className="text-sm">텍스트로 콘텐츠를 저장합니다.</div>
          </div>
          <div className="h-[160px] overflow-hidden rounded-[8px] border-[1.5px] border-gray-lighter outline-[3px] focus-within:border-blue-normal focus-within:outline-blue-light hover:border-blue-normal hover:outline-blue-light">
            <textarea
              className="h-full w-full resize-none p-[12px] text-md outline-none placeholder:text-gray-light"
              value={text}
              onChange={handleChangeText}
              placeholder="콘텐츠를 입력해주세요."
              contentEditable
            />
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
