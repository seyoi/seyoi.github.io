import { Inter } from "next/font/google";

import { NavigateToOtherBusinessPlanButton } from "./components/NavigateToOtherBusinessPlanButton";
import { DocAssistHeader } from "@/domains/doc-assist/components/DocAssistHeader";
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function BusinessPlanAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col leading-[normal] ${inter.className}`}>
      <DocAssistHeader />
      <div className="flex justify-center bg-[#F7F9FC]">
        <div className="flex w-[min(960px,100%)] flex-col bg-[#FFFFFF] p-[2.5rem]">
          <div className="mb-[1rem] self-start">
            <NavigateToOtherBusinessPlanButton />
          </div>
          <div className="mb-[1rem]">
            <div className="flex gap-[1rem] rounded-[0.25rem] bg-[#FFF5F5] p-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M0.666687 13.9997L8.00002 1.33301L15.3334 13.9997H0.666687ZM2.96669 12.6663H13.0334L8.00002 3.99967L2.96669 12.6663ZM8.00002 11.9997C8.18891 11.9997 8.34724 11.9358 8.47502 11.808C8.6028 11.6802 8.66669 11.5219 8.66669 11.333C8.66669 11.1441 8.6028 10.9858 8.47502 10.858C8.34724 10.7302 8.18891 10.6663 8.00002 10.6663C7.81113 10.6663 7.6528 10.7302 7.52502 10.858C7.39724 10.9858 7.33335 11.1441 7.33335 11.333C7.33335 11.5219 7.39724 11.6802 7.52502 11.808C7.6528 11.9358 7.81113 11.9997 8.00002 11.9997ZM7.33335 9.99967H8.66669V6.66634H7.33335V9.99967Z"
                  fill="#FA5252"
                />
              </svg>
              <div className="flex flex-col gap-[0.5rem]">
                <div className="text-[0.875rem] font-[700] text-[#FA5252]">
                  경고
                </div>
                <p className="text-[0.875rem] text-[#0D0B33]">
                  AI가 자동 작성합니다. 사용자가 의도한 내용과 다른 결과를
                  제공할 수도 있습니다. 꼭 결과물을 직접 검토하고 참고해주세요.
                </p>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
