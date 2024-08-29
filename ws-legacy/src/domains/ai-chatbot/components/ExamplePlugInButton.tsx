"use client";

import { PlugInSettingContext } from "@/domains/ai-chatbot/stores/PlugInSettingContext";
import Image from "next/image";
import { useContext } from "react";

export default function ExamplePlugInButton() {
  const { buttonImageUrl, buttonLabelText, marginX, marginY } =
    useContext(PlugInSettingContext);

  return (
    <div className="h-full w-full">
      <div
        className="fixed bottom-[64px] right-[64px] flex flex-col fade-in"
        style={{ right: `${marginX}px`, bottom: `${marginY}px` }}
      >
        <div className="absolute right-0 top-[-64px] flex items-center gap-[8px] rounded-[16px] bg-[#FFFFFF] px-[20px] py-[12px] shadow-[rgba(255,255,255,0.2)_0px_0px_0px_1px_inset,rgba(0,0,0,0.1)_0px_4px_6px,rgba(0,0,0,0.15)_0px_8px_30px]">
          <div className="truncate text-[16px] font-[600] text-[#222222]">
            {buttonLabelText}
          </div>
          <div className="flex items-center justify-center rounded-[50%] bg-[#E8E8E8] p-[8px]">
            <svg
              className="shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M11 1L1 11M1 1L11 11"
                stroke="#354052"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="relative h-[64px] w-[64px] active:scale-90">
          <div className="absolute transition-[visibility] duration-500">
            <div className="plug-in-button-first-show flex items-center justify-center">
              <div className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-[24px] bg-[transparent] shadow-[rgba(255,255,255,0.2)_0px_0px_0px_1px_inset,rgba(0,0,0,0.1)_0px_4px_6px,rgba(0,0,0,0.15)_0px_8px_30px]">
                <Image
                  className="h-full w-full rounded-[24px] object-cover"
                  src={buttonImageUrl}
                  alt="button image"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
