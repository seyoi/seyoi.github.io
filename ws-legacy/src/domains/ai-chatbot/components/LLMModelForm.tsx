"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { updateAIBot } from "../actions/updateAIBot";
import type { AIBotDTO, ModelName } from "@/server/types/AIBot";

export default function LLMModelForm({
  initialAIBot,
}: {
  initialAIBot?: AIBotDTO;
}) {
  const { addAlert } = useContext(AlertContext);
  const [draftModelName, setDraftModelName] = useState<ModelName>(
    initialAIBot?.modelName || "gpt-4o",
  );

  const handle4oClick = () => setDraftModelName("gpt-4o");

  const handle35Click = () => setDraftModelName("gpt-3.5-turbo");

  const handleSaveModelNameClick = async () => {
    try {
      addAlert({ type: "ok", text: "업데이트중입니다." });
      await updateAIBot({
        aiBot: initialAIBot,
        updateParams: {
          modelName: draftModelName,
        },
      });
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  return (
    <div className="flex flex-col gap-[20px] p-[20px]">
      <div className="flex flex-col gap-[4px]">
        <div className="text-lg">
          AI 챗봇의 LLM(대형 언어 모델)을 설정하세요.
        </div>
        <div className="text-sm">
          LLM은 “대형 언어 모델”의 약자입니다. “대형 언어 모델”이란 아주 많은
          양의 텍스트 데이터를 학습하여 <br /> 인간처럼 자연스럽게 언어를
          이해하고 생성할 수 있는 인공지능 모델입니다.
        </div>
      </div>
      <div className="flex gap-[12px]">
        <button
          type="button"
          className={`${draftModelName === "gpt-4o" ? "border-blue-normal outline-blue-light" : "border-gray-lighter"} flex flex-1 flex-col gap-[8px] rounded-[8px] border-[2px] p-[20px] text-start outline-[3px] hover:border-blue-normal hover:outline-blue-light`}
          onClick={handle4oClick}
        >
          <div className="flex items-center gap-[4px]">
            <div className="relative flex h-[20px] w-[20px] items-center justify-center p-[2px]">
              <Image src="/images/llm/gpt4o.png" fill alt="gpt 3.5" />
            </div>
            <div className="text-md">GPT-4o</div>
            {draftModelName === "gpt-4o" && (
              <div className="text-blue-normal">(현재 사용중인 모델)</div>
            )}
          </div>
          <div className="text-sm text-gray-normal">
            장점: 멀티모달 기능 지원으로 텍스트와 이미지 작업 모두 가능
            <br />
            단점: 더 많은 자원 소모와 복잡성으로 인해 구현 및 운영 비용이 높음
            <br />
            <Link
              href="https://openai.com/index/hello-gpt-4o"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-normal"
            >
              더보기
            </Link>
          </div>
        </button>
        <button
          type="button"
          className={`${draftModelName === "gpt-3.5-turbo" ? "border-blue-normal outline-blue-light" : "border-gray-lighter"} flex flex-1 flex-col gap-[8px] rounded-[8px] border-[2px] p-[20px] text-start outline-[3px] hover:border-blue-normal hover:outline-blue-light`}
          onClick={handle35Click}
        >
          <div className="flex items-center gap-[4px]">
            <div className="relative flex h-[20px] w-[20px] items-center justify-center p-[2px]">
              <Image src="/images/llm/gpt3-5.png" fill alt="gpt 3.5" />
            </div>
            <div className="text-md">GPT-3.5</div>
            {draftModelName === "gpt-3.5-turbo" && (
              <div className="text-blue-normal">(현재 사용중인 모델)</div>
            )}
          </div>
          <div className="text-sm text-gray-normal">
            장점: 다양한 텍스트 작업에서 강력한 성능을 발휘
            <br />
            단점: 복잡한 문맥 이해와 일관성 면에서 GPT-4o에 비해 상대적으로 부족
            <br />
            <Link
              href="https://openai.com/index/gpt-3-5-turbo-fine-tuning-and-api-updates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-normal"
            >
              더보기
            </Link>
          </div>
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="rounded-[8px] bg-blue-normal p-[8px] px-[16px] text-md text-white-normal hover:bg-blue-dark"
          onClick={handleSaveModelNameClick}
        >
          저장
        </button>
      </div>
    </div>
  );
}
