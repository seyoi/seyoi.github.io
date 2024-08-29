"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/common/stores/AlertContext";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { addAlert } = useContext(AlertContext);

  useEffect(() => {
    // Log the error to an error reporting service
    addAlert({
      type: "error",
      text: "콘텐츠를 불러오는데 실패했습니다.",
    });
    console.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)]">
      <div className="flex min-w-0 items-center justify-between border-b border-gray-lightest p-[20px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-gray-lighter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M9.13889 2.96333C9.61222 1.01222 12.3878 1.01222 12.8611 2.96333C12.9321 3.25644 13.0714 3.52864 13.2675 3.75778C13.4636 3.98691 13.711 4.1665 13.9896 4.28194C14.2682 4.39738 14.5702 4.44539 14.8709 4.42208C15.1716 4.39876 15.4625 4.30478 15.72 4.14778C17.4344 3.10333 19.3978 5.06556 18.3533 6.78111C18.1966 7.03851 18.1027 7.32926 18.0795 7.62975C18.0562 7.93023 18.1042 8.23197 18.2195 8.51042C18.3348 8.78888 18.5142 9.0362 18.743 9.23228C18.9719 9.42836 19.2438 9.56767 19.5367 9.63889C21.4878 10.1122 21.4878 12.8878 19.5367 13.3611C19.2436 13.4321 18.9714 13.5714 18.7422 13.7675C18.5131 13.9636 18.3335 14.211 18.2181 14.4896C18.1026 14.7682 18.0546 15.0702 18.0779 15.3709C18.1012 15.6716 18.1952 15.9625 18.3522 16.22C19.3967 17.9344 17.4344 19.8978 15.7189 18.8533C15.4615 18.6966 15.1707 18.6027 14.8703 18.5795C14.5698 18.5562 14.268 18.6042 13.9896 18.7195C13.7111 18.8348 13.4638 19.0142 13.2677 19.243C13.0716 19.4719 12.9323 19.7438 12.8611 20.0367C12.3878 21.9878 9.61222 21.9878 9.13889 20.0367C9.06787 19.7436 8.92864 19.4714 8.73254 19.2422C8.53644 19.0131 8.28901 18.8335 8.01039 18.7181C7.73176 18.6026 7.42982 18.5546 7.12913 18.5779C6.82844 18.6012 6.5375 18.6952 6.28 18.8522C4.56556 19.8967 2.60222 17.9344 3.64667 16.2189C3.80345 15.9615 3.89728 15.6707 3.92054 15.3703C3.9438 15.0698 3.89583 14.768 3.78052 14.4896C3.66522 14.2111 3.48584 13.9638 3.25697 13.7677C3.02809 13.5716 2.75618 13.4323 2.46333 13.3611C0.512222 12.8878 0.512222 10.1122 2.46333 9.63889C2.75644 9.56787 3.02864 9.42864 3.25778 9.23254C3.48691 9.03644 3.6665 8.78901 3.78194 8.51039C3.89738 8.23176 3.94539 7.92982 3.92208 7.62913C3.89876 7.32844 3.80478 7.0375 3.64778 6.78C2.60333 5.06556 4.56556 3.10222 6.28111 4.14667C7.39222 4.82222 8.83222 4.22444 9.13889 2.96333Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.66667 11.5C7.66667 12.3841 8.01786 13.2319 8.64298 13.857C9.2681 14.4821 10.1159 14.8333 11 14.8333C11.8841 14.8333 12.7319 14.4821 13.357 13.857C13.9821 13.2319 14.3333 12.3841 14.3333 11.5C14.3333 10.6159 13.9821 9.7681 13.357 9.14298C12.7319 8.51786 11.8841 8.16667 11 8.16667C10.1159 8.16667 9.2681 8.51786 8.64298 9.14298C8.01786 9.7681 7.66667 10.6159 7.66667 11.5Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg">챗봇 콘텐츠 관리</div>
            <div className="whitespace-nowrap text-sm text-gray-normal">
              AI 챗봇을 생성할 때 수집한 데이터들을 관리해보세요.
            </div>
          </div>
        </div>
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/contents/new`}
          className="flex items-center justify-center gap-[12px] rounded-[8px] bg-black-normal px-[16px] py-[8px]"
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M6.28114 10.9631H7.71886V8.21886H10.4631V6.78113H7.71886V4.03692H6.28114V6.78113H3.53692V8.21886H6.28114V10.9631ZM7 14.5C6.02908 14.5 5.11809 14.3164 4.26702 13.9491C3.41594 13.5819 2.67563 13.0835 2.04607 12.4539C1.41651 11.8244 0.918112 11.0841 0.550867 10.233C0.183622 9.38191 0 8.47092 0 7.5C0 6.52908 0.183622 5.61809 0.550867 4.76702C0.918112 3.91594 1.41651 3.17563 2.04607 2.54607C2.67563 1.91651 3.41594 1.41811 4.26702 1.05087C5.11809 0.683622 6.02908 0.5 7 0.5C7.97092 0.5 8.88191 0.683622 9.73298 1.05087C10.5841 1.41811 11.3244 1.91651 11.9539 2.54607C12.5835 3.17563 13.0819 3.91594 13.4491 4.76702C13.8164 5.61809 14 6.52908 14 7.5C14 8.47092 13.8164 9.38191 13.4491 10.233C13.0819 11.0841 12.5835 11.8244 11.9539 12.4539C11.3244 13.0835 10.5841 13.5819 9.73298 13.9491C8.88191 14.3164 7.97092 14.5 7 14.5ZM7 12.9392C8.52125 12.9392 9.80809 12.413 10.8605 11.3605C11.913 10.3081 12.4392 9.02125 12.4392 7.5C12.4392 5.97875 11.913 4.69191 10.8605 3.63945C9.80809 2.58701 8.52125 2.06079 7 2.06079C5.47875 2.06079 4.19191 2.58701 3.13945 3.63945C2.08701 4.69191 1.56079 5.97875 1.56079 7.5C1.56079 9.02125 2.08701 10.3081 3.13945 11.3605C4.19191 12.413 5.47875 12.9392 7 12.9392Z"
              fill="white"
            />
          </svg>
          <div className="whitespace-nowrap text-md text-white-normal">
            콘텐츠 추가하기
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="163"
          viewBox="0 0 130 163"
          fill="none"
        >
          <path
            opacity="0.49"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M60.1978 30.1804C55.9758 30.5349 52.0828 31.3451 48.4639 32.4085H48.3543C49.2864 25.8761 54.7695 20.6604 61.7879 19.597V13.0647C59.0464 12.1025 57.1273 9.67191 57.1273 6.78553C57.1273 3.0383 60.4171 0 64.4746 0C68.5322 0 71.822 3.0383 71.822 6.78553C71.822 9.62127 69.9029 12.1025 67.1614 13.0647V19.597C74.1798 20.6604 79.6629 25.8761 80.595 32.4085C76.9762 31.2944 73.0283 30.4842 68.8612 30.1804H68.6967C68.0935 30.1298 67.4355 30.0791 66.7776 30.0791H64.5295H62.2814C61.9524 30.0791 61.6372 30.1044 61.3219 30.1298L61.3219 30.1298L61.3218 30.1298C61.0065 30.1551 60.6913 30.1804 60.3623 30.1804H60.1978ZM119.195 74.0312H123.856H123.911C126.707 74.0312 129.01 76.158 129.01 78.7405V90.3367C129.01 92.9192 126.707 95.0461 123.911 95.0461H119.908C119.36 99.7048 117.331 103.958 114.37 107.452V126.847C114.37 133.784 106.036 137.987 99.7302 134.24L65.0769 116.972H35.8518C22.0892 116.972 10.7391 107.402 9.149 95.0461H5.09149C2.2951 95.0461 -0.0078125 92.9192 -0.0078125 90.3367V78.7405C-0.0078125 76.158 2.2951 74.0312 5.09149 74.0312H9.75215C11.5067 66.2835 15.8384 58.5865 22.6375 52.3074C22.6375 52.3074 37.2774 36.8121 60.1421 34.9891H60.3066C60.9097 34.9384 61.5677 34.8878 62.2257 34.8878H64.4737H66.7218C67.0508 34.8878 67.3661 34.9131 67.6814 34.9384C67.9966 34.9638 68.3119 34.9891 68.6409 34.9891H68.8054C91.67 36.8121 106.31 52.3074 106.31 52.3074C113.164 58.6371 117.496 66.2835 119.195 74.0312ZM93.3698 100.718C97.8111 100.718 101.375 97.426 101.375 93.3243V69.0686C101.375 64.9669 97.8111 61.6754 93.3698 61.6754H35.5228C31.0815 61.6754 27.5175 64.9669 27.5175 69.0686V93.375C27.5175 97.4767 31.0815 100.768 35.5228 100.768H72.4243L90.7927 111.757C91.6152 112.263 92.7666 111.706 92.7666 110.744V100.718H93.3698ZM60.1773 76.1165L56.2613 72.5C56.09 72.3418 55.8123 72.3418 55.641 72.5L52.2691 75.6141L48.9487 72.5477C48.756 72.3697 48.4435 72.3697 48.2508 72.5477L44.4124 76.0925C44.2197 76.2705 44.2197 76.5591 44.4124 76.737L47.7328 79.8035L44.3973 82.8839C44.226 83.0422 44.2259 83.2987 44.3972 83.4569L48.3132 87.0733C48.4845 87.2315 48.7622 87.2315 48.9335 87.0733L52.2691 83.9929L55.5787 87.0493C55.7714 87.2273 56.0838 87.2273 56.2765 87.0493L60.1149 83.5045C60.3076 83.3265 60.3076 83.0379 60.1149 82.86L56.8053 79.8035L60.1773 76.6894C60.3486 76.5312 60.3486 76.2747 60.1773 76.1165ZM84.6011 76.1377L80.6852 72.5212C80.5139 72.363 80.2361 72.363 80.0648 72.5212L76.6992 75.6295L73.3843 72.5681C73.1915 72.3901 72.8791 72.3901 72.6864 72.5681L68.848 76.1129C68.6553 76.2909 68.6553 76.5795 68.848 76.7575L72.1629 79.8189L68.8211 82.9052C68.6498 83.0634 68.6498 83.3199 68.8211 83.4781L72.737 87.0946C72.9083 87.2528 73.1861 87.2527 73.3574 87.0945L76.6992 84.0083L80.0142 87.0698C80.2069 87.2477 80.5194 87.2477 80.7121 87.0698L84.5505 83.5249C84.7432 83.3469 84.7432 83.0584 84.5505 82.8804L81.2355 79.8189L84.6011 76.7106C84.7724 76.5524 84.7724 76.2959 84.6011 76.1377Z"
            fill="#CDCDCF"
          />
          <g opacity="0.3" filter="url(#filter0_f_2395_3952)">
            <ellipse
              cx="64.7539"
              cy="151.393"
              rx="31.875"
              ry="5.60714"
              fill="#CDCDCF"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2395_3952"
              x="27.8194"
              y="140.726"
              width="73.8691"
              height="21.3333"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2.52976"
                result="effect1_foregroundBlur_2395_3952"
              />
            </filter>
          </defs>
        </svg>
        <div className="text-boldlg">콘텐츠를 불러오는데 실패했습니다.</div>
        <div className="text">
          지속적으로 반복되면 왼쪽 사이드바 하단의 챗봇에 문의를 남겨주세요.
          신속하게 대응해드리겠습니다.
        </div>
      </div>
    </div>
  );
}