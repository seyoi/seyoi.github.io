"use client";

import { useState } from "react";
import {
  BusinessPlanFilesContext,
  YechangepaePromptContext,
} from "../contexts";

import { useBusinessPlan } from "../useBusinessPlan";

import { Separator } from "../components/Separator";
import { BusinessPlanInputForm } from "../components/BusinessPlanInputForm";

import { LoadingSpinnerWithDocentyLogo } from "../../../../common/components/LoadingSpinnerWithDocentyLogo";
import { PopUpMessage } from "../components/PopUpMessage";

import { BusinessPlanTitle } from "../components/BusinessPlanTitle";
// import { BusinessPlanChatbot } from "../components/BusinessPlanChatbot";
import { addToOrderFromNaverSmartStoreList } from "../actions";
import { LoadingSpinner } from "../../../../common/components/LoadingSpinner";
import Link from "next/link";

export default function YechangepaeContainer({ userId }: { userId: string }) {
  const {
    prompt,
    files,
    taskName,
    businessPlanHistoryId,
    businessPlanForm,
    setPrompt,
    setFiles,
    setTaskName,
    setBusinessPlanHistoryId,
    executeScrapingBusinessPlan,
    setAllBusinessPlanFormItemsLoading,
    writeAllBusinessPlanFormItem,
    writeBusinessPlanFormItem,
  } = useBusinessPlan({
    type: "yechangpae",
  });
  const [popUpStatus, setPopUpStatus] = useState<{
    message: string;
    isPopUp: boolean;
    backgroundColor: string;
  }>({
    message: "",
    isPopUp: false,
    backgroundColor: "#1FD8B6",
  });
  const [isRunAutoWriteAll, setIsRunAutoWriteAll] = useState(false);
  const [visibleRunAutoWriteAllAlert, setVisibleRunAutoWriteAllAlert] =
    useState(false);
  const [
    isConfirmRunAutoWriteAllButtonClicked,
    setIsConfirmRunAutoWriteAllButtonClicked,
  ] = useState(false);
  const [isPurchasePopupVisible, setIsPurchasePopupVisible] = useState(false);

  const handleAutoWriteAll = async () => {
    try {
      if (
        files.length === 0 &&
        prompt.type === "yechangpae" &&
        (prompt.yechangpae_ee19b046_d62f_439c_8b47_2ab6ca1e1e42_item_name ===
          "" ||
          prompt.yechangpae_2271ffb1_780c_46b6_a8a7_641147aa461a_item_desc ===
            "")
      ) {
        setPopUpStatus({
          message:
            "최소 1개 이상의 사업 관련 문서를 업로드하거나, 창업 아이템 이름과 설명을 적어주세요.",
          isPopUp: true,
          backgroundColor: "#FA5252",
        });
        return;
      }

      setVisibleRunAutoWriteAllAlert(true);

      return;
    } catch (err) {
      throw `Handler Auto write all ${err}`;
    }
  };

  const handleConfirmRunAutoWriteAll = async () => {
    try {
      setIsConfirmRunAutoWriteAllButtonClicked(true);
      // if (
      //   await isFreeTrialAndBusinessPlanHistoryExceedOne({
      //     userId: userId || "",
      //     businessPlanType: "yechangpae",
      //   })
      // ) {
      //   setIsPurchasePopupVisible(true);
      //   return;
      // }
      setVisibleRunAutoWriteAllAlert(false);
      window.gtag("event", "conversion", {
        send_to: "AW-11469707361/VBIgCPLms40ZEOGwl90q",
        event_callback: () => console.log("yechangpae callback"),
        currency: "KRW",
        value: 1.0,
      });

      await runAutoWriteAll();
    } catch (err) {
      throw `handleConfirmRunAutoWriteAll ${err}`;
    } finally {
      setIsConfirmRunAutoWriteAllButtonClicked(false);
      setVisibleRunAutoWriteAllAlert(false);
    }
  };

  const runAutoWriteAll = async () => {
    try {
      setIsRunAutoWriteAll(true);
      setAllBusinessPlanFormItemsLoading();
      const { taskName, businessPlanHistoryId } =
        await executeScrapingBusinessPlan({
          prompt,
          files,
          userId: userId || "",
        });
      setTaskName(taskName);
      setBusinessPlanHistoryId(businessPlanHistoryId);
      await writeAllBusinessPlanFormItem({
        taskName,
        businessPlanHistoryId,
      });
    } catch (err) {
      throw `runAutoWriteAll ${err}`;
    } finally {
      setIsRunAutoWriteAll(false);
    }
  };

  const cancelRunAutoWriteAll = () => setVisibleRunAutoWriteAllAlert(false);

  return (
    <BusinessPlanFilesContext.Provider value={{ files, setFiles }}>
      <YechangepaePromptContext.Provider value={{ prompt, setPrompt }}>
        <BusinessPlanTitle
          title="예비 창업 패키지 with docenty.ai"
          subTitle="창업사업화 지원사업 사업계획서 자동 작성 AI 도우미, 도슨티 서류비서"
        />
        <Separator marginY="1rem" />
        <BusinessPlanInputForm type="yechangpae" />
        <div className="my-[1.5rem] flex flex-col items-center justify-center gap-[1rem]">
          <button
            type="button"
            className="flex items-center justify-center rounded-[0.25rem] bg-[#0D0B33] p-[0.5rem] text-[0.8125rem] font-[600] text-[#FFFFFF] disabled:bg-[#EFF3FA] disabled:text-[#0d0b333f]"
            onClick={handleAutoWriteAll}
            disabled={isRunAutoWriteAll}
          >
            사업계획서 초안부터 한번에 자동으로 작성해보기
          </button>
          <div
            className={`${
              visibleRunAutoWriteAllAlert ? "flex" : "hidden"
            } rounded-[1rem] bg-[#FFFFFF]`}
          >
            <div className="flex items-center gap-[1rem]">
              <div className="flex flex-col items-center">
                <div className="text-[1rem] font-[700] text-[#0D0B33]">
                  위 내용대로 사업계획서 초안을 자동으로 작성합니다. 계속
                  진행하시겠습니까?
                </div>
                <div className="text-[0.875rem] font-[500] text-[#0D0B33]">
                  (Free trial 이용 중입니다. 사업계획서는 최초 1회만 생성
                  가능합니다)
                </div>
              </div>
              <div className="flex items-center justify-center gap-[0.5rem]">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-[0.25rem] bg-[#FFFFFF] p-[0.5rem] text-[0.875rem] font-[700] text-[#0D0B33] hover:bg-[#0D0B33] hover:text-[#FFFFFF] disabled:bg-[#EFF3FA] disabled:text-[#0d0b333f]"
                  onClick={cancelRunAutoWriteAll}
                  disabled={
                    isRunAutoWriteAll || isConfirmRunAutoWriteAllButtonClicked
                  }
                >
                  취소
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-[0.25rem] bg-[#416BFF] p-[0.5rem] text-[0.875rem] font-[700] text-[#FFFFFF] hover:bg-[#3356D1] disabled:bg-[#EFF3FA] disabled:text-[#0d0b333f]"
                  onClick={handleConfirmRunAutoWriteAll}
                  disabled={
                    isRunAutoWriteAll || isConfirmRunAutoWriteAllButtonClicked
                  }
                >
                  작성하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="relative mt-[1.5rem] flex flex-col gap-[1.5rem]">
          <div className="flex flex-col gap-[1.5rem]">
            <div className="text-[1.5rem] font-[600] text-[#0D0B33]">
              문제인식(Problem)
            </div>
            {businessPlanForm
              .filter((item) => item.bigTitle === "문제인식(Ploblem)")
              .map(({ smallTitle, answer, status }, i) => (
                <div key={i} className="flex flex-col gap-[1.5rem]">
                  <div className="flex flex-col gap-[1rem] hover:outline-dashed hover:outline-offset-8 hover:outline-[#DEDEDE]">
                    <div className="flex items-center justify-between">
                      <div className="text-[1.125rem] font-[500] text-[#0D0B33]">
                        {smallTitle}
                      </div>
                      {status === "SUCCEEDED" && (
                        <button
                          type="button"
                          className="flex items-center justify-center gap-[0.25rem] rounded-[1rem] bg-[#EFF3FA] p-[0.5rem] text-[0.75rem] font-[600] text-[#707787] hover:bg-[#DEDEDE]"
                          onClick={() =>
                            writeBusinessPlanFormItem({
                              taskName,
                              smallTitle,
                              businessPlanHistoryId,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                          >
                            <path
                              d="M4.95 10C4.14167 10 3.44792 9.7375 2.86875 9.2125C2.28958 8.6875 2 8.03333 2 7.25C2 6.46667 2.28958 5.8125 2.86875 5.2875C3.44792 4.7625 4.14167 4.5 4.95 4.5H8.1L6.8 3.2L7.5 2.5L10 5L7.5 7.5L6.8 6.8L8.1 5.5H4.95C4.425 5.5 3.96875 5.66667 3.58125 6C3.19375 6.33333 3 6.75 3 7.25C3 7.75 3.19375 8.16667 3.58125 8.5C3.96875 8.83333 4.425 9 4.95 9H8.5V10H4.95Z"
                              fill="#707787"
                            />
                          </svg>

                          <span>다시 작성하기</span>
                        </button>
                      )}
                    </div>
                    <div className="flex min-h-[5.3125rem] rounded-[0.25rem] bg-[#F7F9FC] p-[1rem] text-[1rem] leading-[150%] text-[#0D0B33] outline-none empty:before:text-[#0d0b337f] empty:before:content-[attr(placeholder)] focus:border focus:border-[#0D0B33] focus:bg-[#FFFFFF]">
                      <div className="relative flex w-full flex-col">
                        <p
                          className="flex-1 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                        <button
                          type="button"
                          className={`${
                            status === "SUCCEEDED" ? "flex" : "hidden"
                          } items-center justify-center gap-[0.25rem] self-end rounded-[1rem] px-[0.5rem] py-[0.25rem] hover:bg-[#DEDEDE]`}
                          onClick={async () => {
                            await window.navigator.clipboard.writeText(answer);
                            setPopUpStatus({
                              message: "클립보드에 복사되었습니다.",
                              isPopUp: true,
                              backgroundColor: "#1FD8B6",
                            });
                          }}
                        >
                          {/* <CopyIcon className="shrink-0" /> */}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              d="M5.25 11.0003C4.92917 11.0003 4.65451 10.8861 4.42604 10.6576C4.19757 10.4291 4.08333 10.1545 4.08333 9.83366V2.83366C4.08333 2.51283 4.19757 2.23817 4.42604 2.0097C4.65451 1.78123 4.92917 1.66699 5.25 1.66699H10.5C10.8208 1.66699 11.0955 1.78123 11.324 2.0097C11.5524 2.23817 11.6667 2.51283 11.6667 2.83366V9.83366C11.6667 10.1545 11.5524 10.4291 11.324 10.6576C11.0955 10.8861 10.8208 11.0003 10.5 11.0003H5.25ZM5.25 9.83366H10.5V2.83366H5.25V9.83366ZM2.91667 13.3337C2.59583 13.3337 2.32118 13.2194 2.09271 12.9909C1.86424 12.7625 1.75 12.4878 1.75 12.167V4.00033H2.91667V12.167H9.33333V13.3337H2.91667Z"
                              fill="#0D0B33"
                            />
                          </svg>

                          <span className="text-[0.875rem] text-[#0D0B33]">
                            copy
                          </span>
                        </button>
                        <div
                          className={`${
                            status === "SUCCEEDED" ? "hidden" : "flex"
                          } ${
                            status === "LOADING" && answer
                              ? "bg-[#ffffffb2]"
                              : "bg-[#F7F9FC]"
                          } absolute left-0 top-0 h-full w-full items-center justify-center backdrop-blur-[5px]`}
                        >
                          <LoadingSpinnerWithDocentyLogo
                            isDone={status === "SUCCEEDED"}
                            isLoading={status === "LOADING"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            <div className="text-[1.5rem] font-[600] text-[#0D0B33]">
              실현가능성(Solution)
            </div>
            {businessPlanForm
              .filter((item) => item.bigTitle === "실현가능성(Solution)")
              .map(({ smallTitle, answer, status }, i) => (
                <div key={i} className="flex flex-col gap-[1.5rem]">
                  <div className="flex flex-col gap-[1rem] hover:outline-dashed hover:outline-offset-8 hover:outline-[#DEDEDE]">
                    <div className="flex items-center justify-between">
                      <div className="text-[1.125rem] font-[500] text-[#0D0B33]">
                        {smallTitle}
                      </div>
                      {status === "SUCCEEDED" && (
                        <button
                          type="button"
                          className="flex items-center justify-center gap-[0.25rem] rounded-[1rem] bg-[#EFF3FA] p-[0.5rem] text-[0.75rem] font-[600] text-[#707787] hover:bg-[#DEDEDE]"
                          onClick={() =>
                            writeBusinessPlanFormItem({
                              taskName,
                              smallTitle,
                              businessPlanHistoryId,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                          >
                            <path
                              d="M4.95 10C4.14167 10 3.44792 9.7375 2.86875 9.2125C2.28958 8.6875 2 8.03333 2 7.25C2 6.46667 2.28958 5.8125 2.86875 5.2875C3.44792 4.7625 4.14167 4.5 4.95 4.5H8.1L6.8 3.2L7.5 2.5L10 5L7.5 7.5L6.8 6.8L8.1 5.5H4.95C4.425 5.5 3.96875 5.66667 3.58125 6C3.19375 6.33333 3 6.75 3 7.25C3 7.75 3.19375 8.16667 3.58125 8.5C3.96875 8.83333 4.425 9 4.95 9H8.5V10H4.95Z"
                              fill="#707787"
                            />
                          </svg>

                          <span>다시 작성하기</span>
                        </button>
                      )}
                    </div>
                    <div className="flex min-h-[5.3125rem] rounded-[0.25rem] bg-[#F7F9FC] p-[1rem] text-[1rem] leading-[150%] text-[#0D0B33] outline-none empty:before:text-[#0d0b337f] empty:before:content-[attr(placeholder)] focus:border focus:border-[#0D0B33] focus:bg-[#FFFFFF]">
                      <div className="relative flex w-full flex-col">
                        <p
                          className="flex-1 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                        <button
                          type="button"
                          className={`${
                            status === "SUCCEEDED" ? "flex" : "hidden"
                          } items-center justify-center gap-[0.25rem] self-end rounded-[1rem] px-[0.5rem] py-[0.25rem] hover:bg-[#DEDEDE]`}
                          onClick={async () => {
                            await window.navigator.clipboard.writeText(answer);
                            setPopUpStatus({
                              message: "클립보드에 복사되었습니다.",
                              isPopUp: true,
                              backgroundColor: "#1FD8B6",
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              d="M5.25 11.0003C4.92917 11.0003 4.65451 10.8861 4.42604 10.6576C4.19757 10.4291 4.08333 10.1545 4.08333 9.83366V2.83366C4.08333 2.51283 4.19757 2.23817 4.42604 2.0097C4.65451 1.78123 4.92917 1.66699 5.25 1.66699H10.5C10.8208 1.66699 11.0955 1.78123 11.324 2.0097C11.5524 2.23817 11.6667 2.51283 11.6667 2.83366V9.83366C11.6667 10.1545 11.5524 10.4291 11.324 10.6576C11.0955 10.8861 10.8208 11.0003 10.5 11.0003H5.25ZM5.25 9.83366H10.5V2.83366H5.25V9.83366ZM2.91667 13.3337C2.59583 13.3337 2.32118 13.2194 2.09271 12.9909C1.86424 12.7625 1.75 12.4878 1.75 12.167V4.00033H2.91667V12.167H9.33333V13.3337H2.91667Z"
                              fill="#0D0B33"
                            />
                          </svg>

                          <span className="text-[0.875rem] text-[#0D0B33]">
                            copy
                          </span>
                        </button>
                        <div
                          className={`${
                            status === "SUCCEEDED" ? "hidden" : "flex"
                          } ${
                            status === "LOADING" && answer
                              ? "bg-[#ffffffb2]"
                              : "bg-[#F7F9FC]"
                          } absolute left-0 top-0 h-full w-full items-center justify-center backdrop-blur-[5px]`}
                        >
                          <LoadingSpinnerWithDocentyLogo
                            isDone={status === "SUCCEEDED"}
                            isLoading={status === "LOADING"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            <div className="text-[1.5rem] font-[600] text-[#0D0B33]">
              성장전략(Scale-Up)
            </div>
            {businessPlanForm
              .filter((item) => item.bigTitle === "성장전략(Scale-Up)")
              .map(({ smallTitle, answer, status }, i) => (
                <div key={i} className="flex flex-col gap-[1.5rem]">
                  <div className="flex flex-col gap-[1rem] hover:outline-dashed hover:outline-offset-8 hover:outline-[#DEDEDE]">
                    <div className="flex items-center justify-between">
                      <div className="text-[1.125rem] font-[500] text-[#0D0B33]">
                        {smallTitle}
                      </div>
                      {status === "SUCCEEDED" && (
                        <button
                          type="button"
                          className="flex items-center justify-center gap-[0.25rem] rounded-[1rem] bg-[#EFF3FA] p-[0.5rem] text-[0.75rem] font-[600] text-[#707787] hover:bg-[#DEDEDE]"
                          onClick={() =>
                            writeBusinessPlanFormItem({
                              taskName,
                              smallTitle,
                              businessPlanHistoryId,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                          >
                            <path
                              d="M4.95 10C4.14167 10 3.44792 9.7375 2.86875 9.2125C2.28958 8.6875 2 8.03333 2 7.25C2 6.46667 2.28958 5.8125 2.86875 5.2875C3.44792 4.7625 4.14167 4.5 4.95 4.5H8.1L6.8 3.2L7.5 2.5L10 5L7.5 7.5L6.8 6.8L8.1 5.5H4.95C4.425 5.5 3.96875 5.66667 3.58125 6C3.19375 6.33333 3 6.75 3 7.25C3 7.75 3.19375 8.16667 3.58125 8.5C3.96875 8.83333 4.425 9 4.95 9H8.5V10H4.95Z"
                              fill="#707787"
                            />
                          </svg>

                          <span>다시 작성하기</span>
                        </button>
                      )}
                    </div>
                    <div className="flex min-h-[5.3125rem] rounded-[0.25rem] bg-[#F7F9FC] p-[1rem] text-[1rem] leading-[150%] text-[#0D0B33] outline-none empty:before:text-[#0d0b337f] empty:before:content-[attr(placeholder)] focus:border focus:border-[#0D0B33] focus:bg-[#FFFFFF]">
                      <div className="relative flex w-full flex-col">
                        <p
                          className="flex-1 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                        <button
                          type="button"
                          className={`${
                            status === "SUCCEEDED" ? "flex" : "hidden"
                          } items-center justify-center gap-[0.25rem] self-end rounded-[1rem] px-[0.5rem] py-[0.25rem] hover:bg-[#DEDEDE]`}
                          onClick={async () => {
                            await window.navigator.clipboard.writeText(answer);
                            setPopUpStatus({
                              message: "클립보드에 복사되었습니다.",
                              isPopUp: true,
                              backgroundColor: "#1FD8B6",
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              d="M5.25 11.0003C4.92917 11.0003 4.65451 10.8861 4.42604 10.6576C4.19757 10.4291 4.08333 10.1545 4.08333 9.83366V2.83366C4.08333 2.51283 4.19757 2.23817 4.42604 2.0097C4.65451 1.78123 4.92917 1.66699 5.25 1.66699H10.5C10.8208 1.66699 11.0955 1.78123 11.324 2.0097C11.5524 2.23817 11.6667 2.51283 11.6667 2.83366V9.83366C11.6667 10.1545 11.5524 10.4291 11.324 10.6576C11.0955 10.8861 10.8208 11.0003 10.5 11.0003H5.25ZM5.25 9.83366H10.5V2.83366H5.25V9.83366ZM2.91667 13.3337C2.59583 13.3337 2.32118 13.2194 2.09271 12.9909C1.86424 12.7625 1.75 12.4878 1.75 12.167V4.00033H2.91667V12.167H9.33333V13.3337H2.91667Z"
                              fill="#0D0B33"
                            />
                          </svg>

                          <span className="text-[0.875rem] text-[#0D0B33]">
                            copy
                          </span>
                        </button>
                        <div
                          className={`${
                            status === "SUCCEEDED" ? "hidden" : "flex"
                          } ${
                            status === "LOADING" && answer
                              ? "bg-[#ffffffb2]"
                              : "bg-[#F7F9FC]"
                          } absolute left-0 top-0 h-full w-full items-center justify-center backdrop-blur-[5px]`}
                        >
                          <LoadingSpinnerWithDocentyLogo
                            isDone={status === "SUCCEEDED"}
                            isLoading={status === "LOADING"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            <div className="text-[1.5rem] font-[600] text-[#0D0B33]">
              팀구성(Team)
            </div>
            {businessPlanForm
              .filter((item) => item.bigTitle === "팀구성(Team)")
              .map(({ smallTitle, answer, status }, i) => (
                <div key={i} className="flex flex-col gap-[1.5rem]">
                  <div className="flex flex-col gap-[1rem] hover:outline-dashed hover:outline-offset-8 hover:outline-[#DEDEDE]">
                    <div className="flex items-center justify-between">
                      <div className="text-[1.125rem] font-[500] text-[#0D0B33]">
                        {smallTitle}
                      </div>
                      {status === "SUCCEEDED" && (
                        <button
                          type="button"
                          className="flex items-center justify-center gap-[0.25rem] rounded-[1rem] bg-[#EFF3FA] p-[0.5rem] text-[0.75rem] font-[600] text-[#707787] hover:bg-[#DEDEDE]"
                          onClick={() =>
                            writeBusinessPlanFormItem({
                              taskName,
                              smallTitle,
                              businessPlanHistoryId,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                          >
                            <path
                              d="M4.95 10C4.14167 10 3.44792 9.7375 2.86875 9.2125C2.28958 8.6875 2 8.03333 2 7.25C2 6.46667 2.28958 5.8125 2.86875 5.2875C3.44792 4.7625 4.14167 4.5 4.95 4.5H8.1L6.8 3.2L7.5 2.5L10 5L7.5 7.5L6.8 6.8L8.1 5.5H4.95C4.425 5.5 3.96875 5.66667 3.58125 6C3.19375 6.33333 3 6.75 3 7.25C3 7.75 3.19375 8.16667 3.58125 8.5C3.96875 8.83333 4.425 9 4.95 9H8.5V10H4.95Z"
                              fill="#707787"
                            />
                          </svg>

                          <span>다시 작성하기</span>
                        </button>
                      )}
                    </div>
                    <div className="flex min-h-[5.3125rem] rounded-[0.25rem] bg-[#F7F9FC] p-[1rem] text-[1rem] leading-[150%] text-[#0D0B33] outline-none empty:before:text-[#0d0b337f] empty:before:content-[attr(placeholder)] focus:border focus:border-[#0D0B33] focus:bg-[#FFFFFF]">
                      <div className="relative flex w-full flex-col">
                        <p
                          className="flex-1 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                        <button
                          type="button"
                          className={`${
                            status === "SUCCEEDED" ? "flex" : "hidden"
                          } items-center justify-center gap-[0.25rem] self-end rounded-[1rem] px-[0.5rem] py-[0.25rem] hover:bg-[#DEDEDE]`}
                          onClick={async () => {
                            await window.navigator.clipboard.writeText(answer);
                            setPopUpStatus({
                              message: "클립보드에 복사되었습니다.",
                              isPopUp: true,
                              backgroundColor: "#1FD8B6",
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              d="M5.25 11.0003C4.92917 11.0003 4.65451 10.8861 4.42604 10.6576C4.19757 10.4291 4.08333 10.1545 4.08333 9.83366V2.83366C4.08333 2.51283 4.19757 2.23817 4.42604 2.0097C4.65451 1.78123 4.92917 1.66699 5.25 1.66699H10.5C10.8208 1.66699 11.0955 1.78123 11.324 2.0097C11.5524 2.23817 11.6667 2.51283 11.6667 2.83366V9.83366C11.6667 10.1545 11.5524 10.4291 11.324 10.6576C11.0955 10.8861 10.8208 11.0003 10.5 11.0003H5.25ZM5.25 9.83366H10.5V2.83366H5.25V9.83366ZM2.91667 13.3337C2.59583 13.3337 2.32118 13.2194 2.09271 12.9909C1.86424 12.7625 1.75 12.4878 1.75 12.167V4.00033H2.91667V12.167H9.33333V13.3337H2.91667Z"
                              fill="#0D0B33"
                            />
                          </svg>

                          <span className="text-[0.875rem] text-[#0D0B33]">
                            copy
                          </span>
                        </button>
                        <div
                          className={`${
                            status === "SUCCEEDED" ? "hidden" : "flex"
                          } ${
                            status === "LOADING" && answer
                              ? "bg-[#ffffffb2]"
                              : "bg-[#F7F9FC]"
                          } absolute left-0 top-0 h-full w-full items-center justify-center backdrop-blur-[5px]`}
                        >
                          <LoadingSpinnerWithDocentyLogo
                            isDone={status === "SUCCEEDED"}
                            isLoading={status === "LOADING"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <PopUpMessage
          message={popUpStatus.message}
          isPopUp={popUpStatus.isPopUp}
          backgroundColor={popUpStatus.backgroundColor}
          closePopUp={() =>
            setPopUpStatus((prev) => ({ ...prev, isPopUp: false }))
          }
        />
        <PurchasePopup
          isPurchasePopupVisible={isPurchasePopupVisible}
          closePurchasePopup={() => setIsPurchasePopupVisible(false)}
          setPopUpStatus={setPopUpStatus}
        />
        {/* <BusinessPlanChatbot /> */}
      </YechangepaePromptContext.Provider>
    </BusinessPlanFilesContext.Provider>
  );
}

const PurchasePopup = ({
  isPurchasePopupVisible,
  closePurchasePopup,
  setPopUpStatus,
}: {
  isPurchasePopupVisible: boolean;
  closePurchasePopup: () => void;
  setPopUpStatus: React.Dispatch<
    React.SetStateAction<{
      message: string;
      isPopUp: boolean;
      backgroundColor: string;
    }>
  >;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [status, setStatus] = useState<"INIT" | "SENDING" | "SENT" | "ERROR">(
    "INIT",
  );

  return (
    <div
      className={`${
        isPurchasePopupVisible ? "flex" : "hidden"
      } fixed bottom-0 left-0 right-0 top-0 items-center justify-center bg-[#eff3fa8c] backdrop-blur-[4px]`}
    >
      <div className="flex flex-col rounded-[1rem] bg-[#FFFFFF] px-[3rem] py-[3rem] shadow-[0px_17px_17px_-7px_rgba(0,0,0,0.10)]">
        <div className="mb-[2rem] flex flex-col gap-[1.5rem]">
          <div className="text-[1.5rem] font-[700] text-[#0D0B33]">
            현재 Free-Trial로 사업계획서 추가 작성은 멤버십 업그레이드가
            필요합니다
          </div>
          <div className="flex items-center gap-[0.5rem]">
            <div className="flex flex-col text-[0.875rem] font-[500] text-[#0D0B33]">
              <div>
                😄 네이버 스마트스토어 링크를 통해 결제를 진행한 후, 폼을
                제출해주세요.
              </div>
              <div>담당자가 확인후 이메일을 전달드리겠습니다.</div>
            </div>
            <Link
              className="flex items-center justify-center rounded-[0.25rem] bg-[#416BFF] p-[1rem] py-[0.5rem] text-[1rem] font-[600] text-[#FFFFFF] hover:bg-[#3356D1]"
              href="https://smartstore.naver.com/docenty/products/9798073832"
              target="_blank"
              rel="noopener noreferrer"
            >
              결제하러가기
            </Link>
          </div>
          <div className="text-[1rem] font-[600] text-[#0D0B33]">
            혹은 창업을 준비하고 계신가요?
          </div>
          <div className="flex items-center gap-[0.5rem]">
            <div className="flex flex-col text-[0.875rem] font-[500] text-[#0D0B33]">
              <div>
                😄 설문조사를 통해 결제없이 한 달간 본인 사업계획서를 다수
                작성할 수 있습니다.
              </div>
              <div>
                사업계획서 컨설팅, 평가, 첨삭 등 고도화된 추가 기능을 먼저
                만나실 수 있습니다.
              </div>
            </div>
            <Link
              className="flex items-center justify-center rounded-[0.25rem] bg-[#416BFF] p-[1rem] py-[0.5rem] text-[1rem] font-[600] text-[#FFFFFF] hover:bg-[#3356D1]"
              href="https://tally.so/r/w7x5q2"
              target="_blank"
              rel="noopener noreferrer"
            >
              설문조사하러가기
            </Link>
          </div>
        </div>
        <form
          className="flex flex-col gap-[1rem]"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!name || !email || !orderNumber) {
              setPopUpStatus({
                message: "모든 필드를 입력해주세요.",
                isPopUp: true,
                backgroundColor: "#FA5252",
              });
              return;
            }

            try {
              setStatus("SENDING");
              await addToOrderFromNaverSmartStoreList({
                name,
                email,
                orderNumber,
              });
              setStatus("SENT");
              setPopUpStatus({
                message: "입력한 내용이 제출됐습니다!",
                isPopUp: true,
                backgroundColor: "#416BFF",
              });
            } catch (err) {
              setStatus("ERROR");
              setPopUpStatus({
                message: "제출에 실패했습니다.",
                isPopUp: true,
                backgroundColor: "#FA5252",
              });
              throw `Sign in ${err}`;
            } finally {
              closePurchasePopup();
            }
          }}
        >
          <label htmlFor="name" className="flex flex-col gap-[0.25rem]">
            <span className="text-[0.875rem] font-[500] text-[#0D0B33]">
              성함
            </span>
            <input
              id="name"
              className="placeholder:text-[#0d0b337f)] rounded-[0.25rem] border border-[#D3DAE7] p-[0.5rem] text-[1rem] text-[#0D0B33] outline-none focus:border-[#0D0B33]"
              placeholder="eg. 홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-[0.25rem]">
            <span className="text-[0.875rem] font-[500] text-[#0D0B33]">
              이메일
            </span>
            <input
              id="email"
              type="email"
              className="placeholder:text-[#0d0b337f)] rounded-[0.25rem] border border-[#D3DAE7] p-[0.5rem] text-[1rem] text-[#0D0B33] outline-none focus:border-[#0D0B33]"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="on"
            />
          </label>
          <label htmlFor="orderNumber" className="flex flex-col gap-[0.25rem]">
            <span className="text-[0.875rem] font-[500] text-[#0D0B33]">
              네이버 스마트스토어 상품 주문번호
            </span>
            <input
              id="orderNumber"
              className="placeholder:text-[#0d0b337f)] rounded-[0.25rem] border border-[#D3DAE7] p-[0.5rem] text-[1rem] text-[#0D0B33] outline-none focus:border-[#0D0B33]"
              placeholder="eg. XX1234567890"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </label>
          <div className="flex gap-[0.5rem]">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-[0.5rem] rounded-[0.25rem] bg-[#FFFFFF] p-[0.5rem] text-[0.875rem] font-[600] text-[#0D0B33] hover:bg-[#D3DAE7]"
              onClick={closePurchasePopup}
            >
              닫기
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-[0.5rem] rounded-[0.25rem] bg-[#1FD8B6] p-[0.5rem] text-[0.875rem] font-[600] text-[#FFFFFF] hover:bg-[#20C3A5]"
            >
              {status === "SENDING" && (
                <LoadingSpinner color="#FFFFFF" size="16px" borderWidth="2px" />
              )}
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
