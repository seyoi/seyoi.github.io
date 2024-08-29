"use client";

import { useContext, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { updateAIBot } from "../actions/updateAIBot";
import type { AIBotDTO } from "@/server/types/AIBot";

export default function PromptForm({
  initialAIBot,
}: {
  initialAIBot?: AIBotDTO;
}) {
  const { addAlert } = useContext(AlertContext);
  const [draftPrompt, setDraftPrompt] = useState(
    initialAIBot?.namedPrompts?.[0].value || "",
  );

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDraftPrompt(e.target.value);

  const handlePromptSaveClick = async () => {
    try {
      addAlert({ type: "ok", text: "업데이트중입니다." });
      await updateAIBot({
        aiBot: initialAIBot,
        updateParams: {
          model: { namedPrompts: [{ name: "0", value: draftPrompt }] },
        },
      });
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  return (
    <div className="flex min-h-0 flex-col gap-[20px] overflow-y-auto bg-blue-lighter p-[20px]">
      <div className="flex flex-col gap-[4px]">
        <div className="text-lg">AI 챗봇의 프롬프트 맞춤 설정</div>
        <div className="text-sm">
          프롬프트는 AI 챗봇이 사용자와의 대화를 시작하거나 특정 주제를 다룰 때
          참고하는 지침입니다. <br /> 프롬프트를 명확하고 구체적으로 작성하면
          챗봇이 사용자의 요구를 더 잘 이해하고,
          <br /> 보다 정확하고 유용한 정보를 제공할 수 있습니다.
        </div>
      </div>
      <div className="min-h-[300px] overflow-hidden rounded-[8px] border-[1.5px] border-gray-lighter outline-[3px] focus-within:border-blue-normal focus-within:outline-blue-light hover:border-blue-normal hover:outline-blue-light">
        <textarea
          className="h-full w-full resize-none p-[12px] text-md outline-none placeholder:text-gray-light"
          value={draftPrompt}
          onChange={handlePromptChange}
          placeholder="예시: 친절하게 답변해주세요"
          contentEditable
        />
      </div>
      <div className="flex justify-end">
        <button
          className="rounded-[8px] bg-blue-normal p-[8px] px-[16px] text-md text-white-normal hover:bg-blue-dark"
          onClick={handlePromptSaveClick}
        >
          저장
        </button>
      </div>
    </div>
  );
}
