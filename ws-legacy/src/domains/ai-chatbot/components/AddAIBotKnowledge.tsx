"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddAIBotKnowledge() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-[16px] p-[20px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-lg">콘텐츠 추가하기</div>
          <div className="whitespace-nowrap text-sm text-gray-normal">
            데이터를 스크랩하고 AI 챗봇을 훈련시키세요
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <Link
          href={`${pathname}/web`}
          replace
          className="group flex items-center justify-between rounded-[12px] border border-gray-lighter bg-white-normal px-[20px] py-[16px] hover:border-blue-normal"
        >
          <div className="flex items-center gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M18.3643 16.0353L16.95 14.6211L18.3643 13.2069C20.3169 11.2543 20.3169 8.08847 18.3643 6.13585C16.4116 4.18323 13.2458 4.18323 11.2932 6.13585L9.87898 7.55007L8.46477 6.13585L9.87898 4.72164C12.6127 1.98797 17.0448 1.98797 19.7785 4.72164C22.5121 7.45531 22.5121 11.8875 19.7785 14.6211L18.3643 16.0353ZM15.5358 18.8638L14.1216 20.278C11.388 23.0117 6.9558 23.0117 4.22213 20.278C1.48846 17.5443 1.48846 13.1122 4.22213 10.3785L5.63634 8.96428L7.05055 10.3785L5.63634 11.7927C3.68372 13.7453 3.68372 16.9112 5.63634 18.8638C7.58896 20.8164 10.7548 20.8164 12.7074 18.8638L14.1216 17.4496L15.5358 18.8638ZM14.8287 8.25717L16.2429 9.67139L9.17187 16.7425L7.75766 15.3282L14.8287 8.25717Z"
                fill="#5C5C5C"
              />
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-[8px]">
                <div className="text-lg">URL 가져오기</div>
              </div>
              <div className="text-sm text-gray-normal">
                URL에서 웹사이트 콘텐츠를 스크랩 합니다.
              </div>
            </div>
          </div>
          <div className="group-hover:text-blue-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                d="M8.00013 6.5L1.92517 12.5L0.363769 10.9579L4.87733 6.5L0.363769 2.04213L1.92517 0.5L8.00013 6.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <Link
          href={`${pathname}/file`}
          replace
          className="group flex items-center justify-between rounded-[12px] border border-gray-lighter bg-white-normal px-[20px] py-[16px] hover:border-blue-normal"
        >
          <div className="flex items-center gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M14.8287 8.2574L9.1718 13.9143C8.78127 14.3048 8.78127 14.9379 9.1718 15.3285C9.56232 15.719 10.1955 15.719 10.586 15.3285L16.2429 9.67161C17.4144 8.50004 17.4144 6.60055 16.2429 5.42897C15.0713 4.2574 13.1718 4.2574 12.0002 5.42897L6.34337 11.0858C4.39075 13.0384 4.39075 16.2043 6.34337 18.1569C8.29599 20.1095 11.4618 20.1095 13.4144 18.1569L19.0713 12.5L20.4855 13.9143L14.8287 19.5711C12.095 22.3048 7.66283 22.3048 4.92916 19.5711C2.19549 16.8374 2.19549 12.4053 4.92916 9.67161L10.586 4.01476C12.5386 2.06214 15.7045 2.06214 17.6571 4.01476C19.6097 5.96738 19.6097 9.13321 17.6571 11.0858L12.0002 16.7427C10.8287 17.9143 8.92916 17.9143 7.75759 16.7427C6.58601 15.5711 6.58601 13.6716 7.75759 12.5L13.4144 6.84319L14.8287 8.2574Z"
                fill="#5C5C5C"
              />
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-[8px]">
                <div className="text-lg">파일 가져오기</div>
              </div>
              <div className="text-sm text-gray-normal">
                파일에서 콘텐츠를 스크랩 합니다.
              </div>
            </div>
          </div>
          <div className="group-hover:text-blue-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                d="M8.00013 6.5L1.92517 12.5L0.363769 10.9579L4.87733 6.5L0.363769 2.04213L1.92517 0.5L8.00013 6.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <Link
          href={`${pathname}/text`}
          replace
          className="group flex items-center justify-between rounded-[12px] border border-gray-lighter bg-white-normal px-[20px] py-[16px] hover:border-blue-normal"
        >
          <div className="flex items-center gap-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path d="M13 6.5V21.5H11V6.5H5V4.5H19V6.5H13Z" fill="#5C5C5C" />
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-[8px]">
                <div className="text-lg">텍스트 가져오기</div>
              </div>
              <div className="text-sm text-gray-normal">
                텍스트에서 콘텐츠를 스크랩 합니다.
              </div>
            </div>
          </div>
          <div className="group-hover:text-blue-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                d="M8.00013 6.5L1.92517 12.5L0.363769 10.9579L4.87733 6.5L0.363769 2.04213L1.92517 0.5L8.00013 6.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
