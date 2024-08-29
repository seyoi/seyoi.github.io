"use client";

import { useContext, useRef, useState } from "react";
import {
  ChochangepaePromptContext,
  YechangepaePromptContext,
} from "../../../contexts";
import type { BusinessPlanType } from "../../../types";

export function Prompt({ type }: { type: BusinessPlanType }) {
  const { setPrompt: setChochangpaePrompt } = useContext(
    ChochangepaePromptContext,
  );
  const { setPrompt: setYechangpaePrompt } = useContext(
    YechangepaePromptContext,
  );

  if (type === "chochangpae")
    return (
      <div className="flex flex-col gap-[1.5rem]">
        <RequiredInput
          question="창업 아이템의 이름이 무엇인가요?"
          placeholder="창업 아이템 이름"
          handleInput={(text: string) => {
            setChochangpaePrompt((prev) => ({
              ...prev,
              chochangpae_a82443c5_794e_43e3_8dff_9a01d942e49c_item_name: text,
            }));
          }}
        />
        <RequiredInput
          question="창업 아이템에 대한 설명을 적어주세요"
          placeholder="창업 아이템 설명"
          handleInput={(text: string) =>
            setChochangpaePrompt((prev) => ({
              ...prev,
              chochangpae_72857563_4ccf_4add_bf69_681a14a6bcfb_item_desc: text,
            }))
          }
        />
        <OptionalInput
          question="진행상황을 적어주세요"
          placeholder="창업 아이템 진행상황"
          handleInput={(text: string) =>
            setChochangpaePrompt((prev) => ({
              ...prev,
              chochangpae_27a3b793_2954_493a_bd64_f753edbfa699_item_progress:
                text,
            }))
          }
        />
        <OptionalInput
          question="사업화 전략과 비즈니스 모델을 적어주세요"
          placeholder="사업화 전략과 비즈니스 모델"
          handleInput={(text: string) =>
            setChochangpaePrompt((prev) => ({
              ...prev,
              chochangpae_520e6859_78e7_4ee4_aefb_21fb6d5cd324_item_bm: text,
            }))
          }
        />
        <OptionalInput
          question="앞으로의 계획을 알려주세요"
          placeholder="앞으로의 계획"
          handleInput={(text: string) =>
            setChochangpaePrompt((prev) => ({
              ...prev,
              chochangpae_0021ccb0_7de9_4e89_a384_5053b58864df_item_plan: text,
            }))
          }
        />
      </div>
    );

  if (type === "yechangpae")
    return (
      <div className="flex flex-col gap-[1.5rem]">
        <RequiredInput
          question="창업 아이템의 이름이 무엇인가요?"
          placeholder="창업 아이템 이름"
          handleInput={(text: string) => {
            setYechangpaePrompt((prev) => ({
              ...prev,
              yechangpae_ee19b046_d62f_439c_8b47_2ab6ca1e1e42_item_name: text,
            }));
          }}
        />
        <RequiredInput
          question="창업 아이템에 대한 설명을 적어주세요"
          placeholder="창업 아이템 설명"
          handleInput={(text: string) =>
            setYechangpaePrompt((prev) => ({
              ...prev,
              yechangpae_2271ffb1_780c_46b6_a8a7_641147aa461a_item_desc: text,
            }))
          }
        />
        <OptionalInput
          question="진행상황을 적어주세요"
          placeholder="창업 아이템 진행상황"
          handleInput={(text: string) =>
            setYechangpaePrompt((prev) => ({
              ...prev,
              yechangpae_3b10bd5a_7ef2_438f_8dad_b08e04aa9eba_item_progress:
                text,
            }))
          }
        />
        <OptionalInput
          question="사업 확장 전략과 비즈니스 모델을 적어주세요"
          placeholder="사업 확장 전략과 비즈니스 모델"
          handleInput={(text: string) =>
            setYechangpaePrompt((prev) => ({
              ...prev,
              yechangpae_d461c789_32bf_4fae_ad6c_e033c6798bea_item_bm: text,
            }))
          }
        />
        <OptionalInput
          question="앞으로의 계획을 알려주세요"
          placeholder="앞으로의 계획"
          handleInput={(text: string) =>
            setYechangpaePrompt((prev) => ({
              ...prev,
              yechangpae_b8f1f68e_4a7d_4e72_b421_4cf25db4a3a9_item_plan: text,
            }))
          }
        />
      </div>
    );

  return null;
}

const RequiredInput = ({
  question,
  placeholder,
  handleInput,
}: {
  question: string;
  placeholder: string;
  handleInput: (text: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-[1rem] hover:outline-dashed hover:outline-offset-8 hover:outline-[#DEDEDE]">
      <div className="font-500 text-[1.125rem] text-[#0D0B33]">{question}</div>
      <div
        className="min-h-[5.3125rem] rounded-[0.25rem] bg-[#F7F9FC] p-[1rem] text-[1rem] leading-[150%] text-[#0D0B33] outline-none empty:before:cursor-text empty:before:text-[#0d0b337f] empty:before:content-[attr(placeholder)] focus:border focus:border-[#0D0B33] focus:bg-[#FFFFFF] focus:empty:before:content-['']"
        contentEditable="plaintext-only"
        placeholder={placeholder}
        onInput={(e) => handleInput(e.currentTarget.textContent as string)}
      />
    </div>
  );
};

const OptionalInput = ({
  question,
  placeholder,
  handleInput,
}: {
  question: string;
  placeholder: string;
  handleInput: (text: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col hover:outline-dashed hover:outline-offset-8 hover:outline-[#DEDEDE]">
      <div
        className="flex cursor-pointer items-center gap-[1rem]"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center">
          <svg
            className={`${
              isExpanded ? "rotate-90" : "rotate-0"
            } shrink-0 transition-transform`}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.4998 10L6.6665 6.16667L7.83317 5L12.8332 10L7.83317 15L6.6665 13.8333L10.4998 10Z"
              fill="#A2AAB8"
            />
          </svg>
          <div className="text-[0.875rem] font-[600] text-[#A2AAB8]">
            (선택)
          </div>
        </div>
        <div className="font-500 text-[1.125rem] text-[#0D0B33]">
          {question}
        </div>
      </div>
      <div
        className={`${
          !isExpanded
            ? "h-0 overflow-hidden opacity-0"
            : `opacity-100 ${
                ref.current ? ref.current.clientHeight : 85
              }px mt-[1rem]`
        } transition-[opacity,height,margin] duration-200`}
      >
        <div
          ref={ref}
          className="min-h-[5.3125rem] w-full rounded-[0.25rem] bg-[#F7F9FC] p-[1rem] text-[1rem] leading-[150%] text-[#0D0B33] outline-none empty:before:cursor-text empty:before:text-[#0d0b337f] empty:before:content-[attr(placeholder)] focus:border focus:border-[#0D0B33] focus:bg-[#FFFFFF] focus:empty:before:content-['']"
          contentEditable="plaintext-only"
          placeholder={placeholder}
          onInput={(e) => handleInput(e.currentTarget.textContent as string)}
        />
      </div>
    </div>
  );
};
