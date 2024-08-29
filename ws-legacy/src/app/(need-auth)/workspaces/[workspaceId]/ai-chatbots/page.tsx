import Link from "next/link";
import Image from "next/image";
import { getBots } from "@/domains/ai-chatbot/actions/getBots";
import { formatTime } from "@/common/utils/formatTime";

export default async function AIChatbotsPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { workspaceId } = params;
  const { bots, error } = await getBots({ workspaceId });
  if (error) console.error(error);
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
          <div className="text-lg">챗봇 목록</div>
          <div className="whitespace-nowrap text-sm text-gray-normal">
            데이터를 수집하고 AI 지식을 쌓아 만든 나만의 AI 챗봇 목록
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[repeat(auto-fill,minmax(120px,1fr))] gap-[16px] overflow-y-auto bg-blue-lighter p-[20px]">
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/new`}
          className="group flex items-center justify-center gap-[12px] rounded-[20px] border-[1.5px] border-dashed border-gray-lighter hover:border-solid hover:border-blue-normal hover:bg-blue-normal"
        >
          <div className="flex items-center justify-center rounded-[50%] bg-blue-lighter p-[10px] group-hover:bg-white-light">
            <div className="flex h-[18px] w-[18px] items-center justify-center text-gray-light group-hover:text-white-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M7 10.0172H13M10 7.01721V13.0172M1 10.0172C1 11.1991 1.23279 12.3694 1.68508 13.4614C2.13738 14.5533 2.80031 15.5454 3.63604 16.3812C4.47177 17.2169 5.46392 17.8798 6.55585 18.3321C7.64778 18.7844 8.8181 19.0172 10 19.0172C11.1819 19.0172 12.3522 18.7844 13.4442 18.3321C14.5361 17.8798 15.5282 17.2169 16.364 16.3812C17.1997 15.5454 17.8626 14.5533 18.3149 13.4614C18.7672 12.3694 19 11.1991 19 10.0172C19 8.83532 18.7672 7.66499 18.3149 6.57306C17.8626 5.48113 17.1997 4.48898 16.364 3.65325C15.5282 2.81752 14.5361 2.15459 13.4442 1.7023C12.3522 1.25 11.1819 1.01721 10 1.01721C8.8181 1.01721 7.64778 1.25 6.55585 1.7023C5.46392 2.15459 4.47177 2.81752 3.63604 3.65325C2.80031 4.48898 2.13738 5.48113 1.68508 6.57306C1.23279 7.66499 1 8.83532 1 10.0172Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="text-lg text-gray-light group-hover:text-white-normal">
            새로운 챗봇 만들기
          </div>
        </Link>
        {bots.map((bot) => (
          <Link
            key={bot.id}
            href={`/workspaces/${workspaceId}/ai-chatbots/${bot.id}/contents`}
            className="flex items-center gap-[16px] rounded-[20px] border border-gray-lightest p-[20px] hover:border-blue-normal hover:shadow-card"
          >
            <div className="relative flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
              {bot.avatarUrl ? (
                <Image src={bot.avatarUrl} alt="bot avatar" fill />
              ) : (
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="90" height="90" fill="url(#pattern0_871_8087)" />
                  <defs>
                    <pattern
                      id="pattern0_871_8087"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_871_8087"
                        transform="scale(0.00555556)"
                      />
                    </pattern>
                    <image
                      id="image0_871_8087"
                      width="180"
                      height="180"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              )}
            </div>
            <div className="flex max-w-[calc(100%-66px-16px)] flex-col gap-[4px]">
              <div className="truncate break-all text-lg">{bot.name}</div>
              <div className="flex">
                <div className="text-sm text-gray-normal">
                  {formatTime(bot.createdAt)}
                </div>
                <div className="text-sm text-gray-light">· 생성일</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
