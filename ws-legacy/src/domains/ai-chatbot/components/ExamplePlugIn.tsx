"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { BotProfileContext } from "@/domains/ai-chatbot/stores/BotProfileContext";
import { getContrastHexColor } from "@/common/utils/getContrastHexColor";
import { formatTime } from "@/common/utils/formatTime";
import PoweredByDocenty from "@/common/components/PoweredByDocenty";

export default function ExamplePlugIn() {
  const { avatarUrl, name, welcomeMessage, themeColor, coverImageUrl } =
    useContext(BotProfileContext);
  const [currentView, setCurrentView] = useState<"home" | "chat">("home");
  const nonNullThemeColor = themeColor || "#292929";

  const handleClickHome = () => setCurrentView("home");
  const handleClickChat = () => setCurrentView("chat");

  return (
    <div className="flex flex-col gap-[52px]">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-[4px] rounded-[40px] bg-gray-normal p-[4px]">
          <button
            type="button"
            className={`${currentView === "home" ? "bg-white-normal" : "text-white-normal"} rounded-[40px] px-[8px] text-sm hover:bg-white-normal hover:text-black-normal`}
            onClick={handleClickHome}
          >
            홈 화면
          </button>
          <button
            type="button"
            className={`${currentView === "chat" ? "bg-white-normal" : "text-white-normal"} rounded-[40px] px-[8px] text-sm hover:bg-white-normal hover:text-black-normal`}
            onClick={handleClickChat}
          >
            채팅방
          </button>
        </div>
      </div>
      <div
        className="h-[690px] w-[390px] overflow-hidden rounded-[24px] shadow-card"
        style={{ background: `linear-gradient(${themeColor}, #F3F5F7)` }}
      >
        {currentView === "home" && (
          <div className="relative flex h-full flex-col">
            <div className="h-full pb-[70px]">
              <div className="flex h-full w-full flex-col overflow-y-auto">
                <div className="w-full">
                  <div className="absolute left-0 top-0 w-full">
                    <div className="h-[200px] w-full">
                      {coverImageUrl ? (
                        <div className="relative h-[200px] w-full">
                          <Image
                            src={coverImageUrl}
                            alt="plug-in cover image"
                            loading="eager"
                            className="object-cover"
                            fill
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-[12px] px-[33px] py-[22px]">
                          <div className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] shadow-card">
                            <Image
                              className="h-full w-full object-cover"
                              src={avatarUrl}
                              alt="bot avatar"
                              fill
                            />
                          </div>
                          <div
                            className="text-boldlg"
                            style={{
                              color: getContrastHexColor(nonNullThemeColor),
                            }}
                          >
                            {name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="h-[90px] w-full"
                    style={{
                      height: coverImageUrl ? "160px" : "90px",
                    }}
                  ></div>
                </div>
                <div className="z-[2] flex flex-1 flex-col rounded-tl-[24px] rounded-tr-[24px] bg-white-normal shadow-card">
                  <div className="flex flex-col gap-[16px] p-[20px]">
                    <div className="flex gap-[16px] rounded-[20px] p-[8px] hover:bg-blue-lighter">
                      <div className="relative flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] shadow-card">
                        <Image
                          className="h-full w-full object-cover"
                          src={avatarUrl}
                          alt="bot avatar"
                          fill
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-[8px]">
                        <div className="flex items-center justify-between">
                          <div className="text-[15px] font-[700]">{name}</div>
                        </div>
                        <div
                          className="whitespace-pre-wrap text-[15px] font-[500]"
                          dangerouslySetInnerHTML={{
                            __html: welcomeMessage,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-center gap-[8px] rounded-[28px] px-[24px] py-[12px] text-white-normal"
                      style={{
                        backgroundColor: nonNullThemeColor,
                        color: getContrastHexColor(nonNullThemeColor),
                      }}
                    >
                      <div className="text-boldmd">문의하기</div>
                      <div className="flex h-[16px] w-[16px] items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M0.310427 5.58649C-0.103259 5.44842 -0.106521 5.22565 0.318938 5.08364L15.4292 0.0404812C15.8475 -0.0991594 16.0875 0.135327 15.9703 0.546163L11.6531 15.6757C11.5336 16.0946 11.2923 16.1091 11.1156 15.7109L8.26993 9.29997L13.02 2.95841L6.68656 7.71459L0.310427 5.58649Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <PoweredByDocenty />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 flex h-[70px] w-full items-center justify-between bg-[#F3F5F7] shadow-card">
              <div className="flex h-full w-full flex-col items-center justify-center gap-[4px] text-gray-normal">
                <div className="flex h-[14px] w-[14px] items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M6.5702 0.647481C6.69308 0.551896 6.84432 0.5 7 0.5C7.15568 0.5 7.30692 0.551896 7.4298 0.647481L13.1894 5.12733C13.442 5.32381 13.6463 5.57541 13.7868 5.86293C13.9273 6.15045 14.0002 6.46627 14 6.78627V13.1C14 13.4713 13.8525 13.8274 13.5899 14.09C13.3274 14.3525 12.9713 14.5 12.6 14.5H9.8C9.4287 14.5 9.0726 14.3525 8.81005 14.09C8.5475 13.8274 8.4 13.4713 8.4 13.1V8.90019H5.6V13.1C5.6 13.4713 5.4525 13.8274 5.18995 14.09C4.9274 14.3525 4.5713 14.5 4.2 14.5H1.4C1.0287 14.5 0.672601 14.3525 0.41005 14.09C0.1475 13.8274 0 13.4713 0 13.1V6.78627C0 6.13669 0.2996 5.52631 0.812 5.12733L6.5702 0.647481ZM7 2.08663L1.6702 6.23189C1.58582 6.29753 1.51759 6.38162 1.47075 6.47772C1.42392 6.57382 1.39971 6.67936 1.4 6.78627V13.1H4.2V8.90019C4.2 8.5289 4.3475 8.17282 4.61005 7.91028C4.8726 7.64774 5.2287 7.50024 5.6 7.50024H8.4C8.7713 7.50024 9.1274 7.64774 9.38995 7.91028C9.6525 8.17282 9.8 8.5289 9.8 8.90019V13.1H12.6V6.78627C12.6003 6.67936 12.5761 6.57382 12.5292 6.47772C12.4824 6.38162 12.4142 6.29753 12.3298 6.23189L7 2.08803V2.08663Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="text-[13px] font-[600]">홈</div>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-[4px] text-gray-light">
                <div className="flex h-[14px] w-[14px] items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M5.6 0.5H8.4C11.4928 0.5 14 3.07149 14 6.24359C14 9.4157 11.4928 11.9872 8.4 11.9872V14.5C4.9 13.0641 0 10.9103 0 6.24359C0 3.07149 2.5072 0.5 5.6 0.5ZM7 10.5513H8.4C10.7196 10.5513 12.6 8.62266 12.6 6.24359C12.6 3.86452 10.7196 1.9359 8.4 1.9359H5.6C3.2804 1.9359 1.4 3.86452 1.4 6.24359C1.4 8.83538 3.12346 10.5266 7 12.3317V10.5513Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="text-[13px] font-[600]">대화</div>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center gap-[4px] text-gray-light">
                <div className="flex h-[14px] w-[14px] items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M12.2062 8.18542C12.2354 7.96667 12.25 7.74062 12.25 7.5C12.25 7.26667 12.2354 7.03333 12.199 6.81458L13.6792 5.6625C13.8104 5.56042 13.8469 5.36354 13.7667 5.21771L12.3667 2.79687C12.2792 2.63646 12.0969 2.58542 11.9365 2.63646L10.1937 3.33646C9.82916 3.05937 9.44271 2.82604 9.0125 2.65104L8.75 0.798958C8.72083 0.623958 8.575 0.5 8.4 0.5H5.6C5.425 0.5 5.28646 0.623958 5.25729 0.798958L4.99479 2.65104C4.56458 2.82604 4.17083 3.06667 3.81354 3.33646L2.07083 2.63646C1.91041 2.57812 1.72812 2.63646 1.64062 2.79687L0.247915 5.21771C0.160415 5.37083 0.189582 5.56042 0.335415 5.6625L1.81562 6.81458C1.77917 7.03333 1.75 7.27396 1.75 7.5C1.75 7.72604 1.76458 7.96667 1.80104 8.18542L0.320832 9.3375C0.189582 9.43958 0.153124 9.63646 0.233332 9.78229L1.63333 12.2031C1.72083 12.3635 1.90312 12.4146 2.06354 12.3635L3.80625 11.6635C4.17083 11.9406 4.55729 12.174 4.9875 12.349L5.25 14.201C5.28646 14.376 5.425 14.5 5.6 14.5H8.4C8.575 14.5 8.72083 14.376 8.74271 14.201L9.00521 12.349C9.43541 12.174 9.82917 11.9406 10.1865 11.6635L11.9292 12.3635C12.0896 12.4219 12.2719 12.3635 12.3594 12.2031L13.7594 9.78229C13.8469 9.62187 13.8104 9.43958 13.6719 9.3375L12.2062 8.18542ZM7 10.125C5.55625 10.125 4.375 8.94375 4.375 7.5C4.375 6.05625 5.55625 4.875 7 4.875C8.44375 4.875 9.625 6.05625 9.625 7.5C9.625 8.94375 8.44375 10.125 7 10.125Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="text-[13px] font-[600]">설정</div>
              </div>
            </div>
          </div>
        )}
        {currentView === "chat" && (
          <div className="flex h-full w-full flex-col bg-white-normal">
            <div className="flex items-center gap-[20px] border-b border-gray-lighter p-[20px]">
              <div className="flex h-[16px] w-[16px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                >
                  <path
                    d="M7 1.5L1 7.5L7 13.5"
                    stroke="#5C5C5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="relative flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-[30px]">
                  <Image
                    className="h-full w-full object-cover"
                    src={avatarUrl}
                    width={32}
                    height={32}
                    alt="avatar"
                  />
                </div>
                <div className="text-boldmd">{name}</div>
              </div>
            </div>
            <div className="relative flex flex-1 flex-col gap-[20px] overflow-y-auto p-[20px]">
              <div className="flex max-w-[90%] flex-col gap-[8px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="flex gap-[8px]">
                    <div className="relative flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-[30px]">
                      <Image
                        className="h-full w-full object-cover"
                        src={avatarUrl}
                        width={32}
                        height={32}
                        alt="avatar"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-boldsm">{name}</div>
                      <div className="text-xs text-gray-light">
                        {formatTime(new Date())}
                      </div>
                    </div>
                  </div>
                  <div
                    className="self-start whitespace-pre-wrap break-all rounded-[20px] rounded-tl-[4px] bg-mint-light p-[12px] text-sm leading-[150%]"
                    dangerouslySetInnerHTML={{ __html: welcomeMessage }}
                  ></div>
                </div>
              </div>
              <div className="flex max-w-[90%] flex-col self-end">
                <div className="flex flex-col gap-[4px]">
                  <div className="flex gap-[8px] self-end">
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-light">
                        {formatTime(new Date())}
                      </div>
                    </div>
                  </div>
                  <div
                    className="self-start whitespace-pre-wrap break-all rounded-[20px] rounded-br-[4px] bg-black-normal p-[12px] text-sm leading-[150%]"
                    dangerouslySetInnerHTML={{ __html: "안녕하세요!" }}
                    style={{
                      backgroundColor: nonNullThemeColor,
                      color: getContrastHexColor(nonNullThemeColor),
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className={`flex border-t border-gray-lightest`}>
                  <div className="flex flex-1 items-center justify-center gap-[4px] bg-blue-lightest p-[8px] hover:bg-blue-lighter">
                    <div className="flex h-[16px] w-[16px] items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                      >
                        <path
                          d="M8.92311 1.45122C8.92311 1.73294 8.80428 1.98605 8.61542 2.16023V3.35366H11.6923C12.712 3.35366 13.5385 4.20541 13.5385 5.2561V11.5976C13.5385 12.6483 12.712 13.5 11.6923 13.5H4.30773C3.28813 13.5 2.46158 12.6483 2.46158 11.5976V5.2561C2.46158 4.20541 3.28813 3.35366 4.30773 3.35366H7.38465V2.16023C7.19579 1.98605 7.07696 1.73294 7.07696 1.45122C7.07696 0.925874 7.49025 0.5 8.00004 0.5C8.50982 0.5 8.92311 0.925874 8.92311 1.45122ZM4.30773 4.62195C3.96787 4.62195 3.69235 4.90587 3.69235 5.2561V11.5976C3.69235 11.9478 3.96787 12.2317 4.30773 12.2317H11.6923C12.0322 12.2317 12.3077 11.9478 12.3077 11.5976V5.2561C12.3077 4.90587 12.0322 4.62195 11.6923 4.62195H8.61542H7.38465H4.30773ZM6.15388 9.37805C6.66369 9.37805 7.07696 8.95216 7.07696 8.42683C7.07696 7.9015 6.66369 7.47561 6.15388 7.47561C5.64408 7.47561 5.23081 7.9015 5.23081 8.42683C5.23081 8.95216 5.64408 9.37805 6.15388 9.37805ZM9.84619 9.37805C10.356 9.37805 10.7693 8.95216 10.7693 8.42683C10.7693 7.9015 10.356 7.47561 9.84619 7.47561C9.33641 7.47561 8.92311 7.9015 8.92311 8.42683C8.92311 8.95216 9.33641 9.37805 9.84619 9.37805Z"
                          fill="#A6A6A6"
                        />
                        <path
                          d="M1.33366 10.0116C1.15856 10.0116 0.985182 9.97055 0.823414 9.89087C0.661647 9.8112 0.514661 9.69442 0.39085 9.54721C0.267038 9.39999 0.168826 9.22522 0.101819 9.03288C0.0348131 8.84053 0.000325375 8.63438 0.000325383 8.42619C0.000325391 8.21799 0.0348131 8.01184 0.101819 7.81949C0.168826 7.62715 0.267038 7.45238 0.39085 7.30516C0.514661 7.15795 0.661647 7.04117 0.823414 6.9615C0.985182 6.88183 1.15856 6.84082 1.33366 6.84082L1.33366 8.42619L1.33366 10.0116Z"
                          fill="#A6A6A6"
                        />
                        <path
                          d="M14.6663 10.0116C14.8414 10.0116 15.0148 9.97055 15.1766 9.89087C15.3384 9.8112 15.4853 9.69442 15.6092 9.54721C15.733 9.39999 15.8312 9.22522 15.8982 9.03288C15.9652 8.84053 15.9997 8.63438 15.9997 8.42619C15.9997 8.21799 15.9652 8.01184 15.8982 7.81949C15.8312 7.62715 15.733 7.45238 15.6092 7.30516C15.4853 7.15795 15.3384 7.04117 15.1766 6.9615C15.0148 6.88183 14.8414 6.84082 14.6663 6.84082L14.6663 8.42619L14.6663 10.0116Z"
                          fill="#A6A6A6"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-normal">AI 상담</div>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-[4px] border-x border-gray-lightest bg-blue-lightest p-[8px] hover:bg-blue-lighter">
                    <div className="flex h-[16px] w-[16px] items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.42123 12.5647C2.31559 11.9139 0 9.38465 0 6.36364C0 2.8491 3.13401 0 7 0C10.866 0 14 2.8491 14 6.36364C14 9.38465 11.6844 11.9139 8.57878 12.5647L7 14L5.42123 12.5647ZM3.50821 10.3452C4.14713 10.8093 4.90303 11.15 5.73573 11.3245L6.12717 11.4066L7 12.2001L7.87283 11.4066L8.26427 11.3245C9.15215 11.1385 9.95281 10.7634 10.6173 10.2512C9.72755 9.42315 8.48575 8.90909 7.11179 8.90909C5.68666 8.90909 4.40358 9.46222 3.50821 10.3452ZM2.53093 9.4318C3.67951 8.32625 5.30702 7.63636 7.11179 7.63636C8.8508 7.63636 10.4252 8.27686 11.5651 9.31255C12.2194 8.47541 12.6 7.45443 12.6 6.36364C12.6 3.552 10.0928 1.27273 7 1.27273C3.9072 1.27273 1.4 3.552 1.4 6.36364C1.4 7.5068 1.81796 8.57322 2.53093 9.4318ZM7 7C5.4536 7 4.2 5.86034 4.2 4.45455C4.2 3.04873 5.4536 1.90909 7 1.90909C8.54637 1.90909 9.8 3.04873 9.8 4.45455C9.8 5.86034 8.54637 7 7 7ZM7 5.72727C7.77322 5.72727 8.4 5.15747 8.4 4.45455C8.4 3.75164 7.77322 3.18182 7 3.18182C6.22678 3.18182 5.6 3.75164 5.6 4.45455C5.6 5.15747 6.22678 5.72727 7 5.72727Z"
                          fill="#A6A6A6"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-normal">상담원 연결</div>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-[4px] bg-blue-lightest p-[8px] hover:bg-blue-lighter">
                    <div className="flex h-[16px] w-[16px] items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.24984 8.16667L2.9165 5.83333M2.9165 5.83333L5.24984 3.5M2.9165 5.83333H9.33317C9.95201 5.83333 10.5455 6.07917 10.9831 6.51675C11.4207 6.95434 11.6665 7.54783 11.6665 8.16667C11.6665 8.7855 11.4207 9.379 10.9831 9.81658C10.5455 10.2542 9.95201 10.5 9.33317 10.5H8.74984"
                          stroke="#A6A6A6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-normal">홈으로</div>
                  </div>
                </div>
                <div className="z-[2] flex items-end gap-[4px] border-t border-gray-lighter bg-blue-lighter px-[16px] py-[8px]">
                  <div className="flex items-center justify-center rounded-[12px] border border-gray-lighter bg-white-normal p-[12px]">
                    <div
                      className={`flex h-[16px] w-[16px] items-center justify-center transition-transform`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 0.75V11.25M0.75 6H11.25"
                          stroke="#A6A6A6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end rounded-[12px] border border-gray-lighter bg-white-normal px-[12px] py-[8px]">
                    <textarea
                      className="max-h-[92px] flex-1 resize-none text-sm outline-none placeholder:text-gray-light"
                      placeholder="메시지를 입력해주세요."
                      rows={1}
                      disabled
                    />
                    <div className="mb-[4px] text-gray-normal disabled:text-gray-lighter">
                      <div className="flex h-[16px] w-[16px] items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M0.310427 5.58649C-0.103259 5.44842 -0.106521 5.22565 0.318938 5.08364L15.4292 0.0404812C15.8475 -0.0991594 16.0875 0.135327 15.9703 0.546163L11.6531 15.6757C11.5336 16.0946 11.2923 16.1091 11.1156 15.7109L8.26993 9.29997L13.02 2.95841L6.68656 7.71459L0.310427 5.58649Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-mint-light py-[4px]">
                <PoweredByDocenty />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
