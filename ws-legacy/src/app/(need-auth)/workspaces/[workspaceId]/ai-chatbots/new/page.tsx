import Link from "next/link";

export default function CreateNewAIChatbotPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { workspaceId } = params;

  return (
    <div className="grid min-h-0 grid-rows-[90px,minmax(0,1fr)]">
      <div className="flex items-center gap-[12px] border-b border-gray-lightest p-[20px]">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-gray-lighter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
          >
            <path
              d="M12.2692 2.09614C12.2692 2.47204 12.1058 2.80977 11.8461 3.04218V4.6346H16.0769C17.4789 4.6346 18.6154 5.77111 18.6154 7.17306V15.6346C18.6154 17.0366 17.4789 18.1731 16.0769 18.1731H5.92307C4.52112 18.1731 3.38461 17.0366 3.38461 15.6346V7.17306C3.38461 5.77111 4.52112 4.6346 5.92307 4.6346H10.1538V3.04218C9.89415 2.80977 9.73076 2.47204 9.73076 2.09614C9.73076 1.39516 10.299 0.826904 11 0.826904C11.7009 0.826904 12.2692 1.39516 12.2692 2.09614ZM5.92307 6.3269C5.45575 6.3269 5.07691 6.70574 5.07691 7.17306V15.6346C5.07691 16.1019 5.45575 16.4807 5.92307 16.4807H16.0769C16.5442 16.4807 16.9231 16.1019 16.9231 15.6346V7.17306C16.9231 6.70574 16.5442 6.3269 16.0769 6.3269H11.8461H10.1538H5.92307ZM8.46153 12.6731C9.16251 12.6731 9.73076 12.1048 9.73076 11.4038C9.73076 10.7029 9.16251 10.1346 8.46153 10.1346C7.76055 10.1346 7.1923 10.7029 7.1923 11.4038C7.1923 12.1048 7.76055 12.6731 8.46153 12.6731ZM13.5385 12.6731C14.2394 12.6731 14.8077 12.1048 14.8077 11.4038C14.8077 10.7029 14.2394 10.1346 13.5385 10.1346C12.8375 10.1346 12.2692 10.7029 12.2692 11.4038C12.2692 12.1048 12.8375 12.6731 13.5385 12.6731Z"
              fill="#5C5C5C"
            />
            <path
              d="M1.83329 13.5192C1.59254 13.5192 1.35414 13.4645 1.13171 13.3582C0.909276 13.2519 0.707171 13.0961 0.53693 12.8996C0.366689 12.7032 0.231647 12.47 0.139513 12.2134C0.0473796 11.9567 -4.08602e-05 11.6816 -4.08497e-05 11.4038C-4.08392e-05 11.126 0.0473797 10.851 0.139513 10.5943C0.231647 10.3377 0.366689 10.1045 0.53693 9.90803C0.707171 9.7116 0.909276 9.55578 1.13171 9.44948C1.35414 9.34317 1.59254 9.28845 1.83329 9.28845L1.83329 11.4038L1.83329 13.5192Z"
              fill="#5C5C5C"
            />
            <path
              d="M20.1667 13.5192C20.4075 13.5192 20.6459 13.4645 20.8683 13.3582C21.0907 13.2519 21.2928 13.0961 21.4631 12.8996C21.6333 12.7032 21.7684 12.47 21.8605 12.2134C21.9526 11.9567 22 11.6816 22 11.4038C22 11.126 21.9526 10.851 21.8605 10.5943C21.7684 10.3377 21.6333 10.1045 21.4631 9.90803C21.2928 9.7116 21.0907 9.55578 20.8683 9.44948C20.6459 9.34317 20.4075 9.28845 20.1667 9.28845L20.1667 11.4038L20.1667 13.5192Z"
              fill="#5C5C5C"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="text-lg">새로운 AI 챗봇 만들기</div>
          <div className="whitespace-nowrap text-sm text-gray-normal">
            데이터를 스크랩하고 AI 챗봇을 훈련시키세요
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] overflow-y-auto bg-blue-lighter p-[20px]">
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/new/web`}
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
              <div className="text-lg">URL 가져오기</div>
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
          href={`/workspaces/${workspaceId}/ai-chatbots/new/file`}
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
          href={`/workspaces/${workspaceId}/ai-chatbots/new/text`}
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
              <div className="text-lg">텍스트 가져오기</div>
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
