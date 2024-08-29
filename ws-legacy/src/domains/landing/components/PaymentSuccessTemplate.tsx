"use client";

import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { CustomError, toCustomError } from "@/common/utils/customError";
import useFailRouter from "@/domains/landing/hooks/useFailRouter";
import {
  PaymentResult,
  PaymentSubscriptionType,
} from "@/domains/landing/types/types";
import { findReadyPaymentSubscription } from "@/domains/landing/actions/getReadyPaymentSubscription";
import { issuePaymentsKey } from "@/domains/landing/actions/issuePaymentsKey";
import { fetchFirstBillingPayments } from "@/domains/landing/actions/requestFirstBillingPayments";

export function PaymentSuccessTemplate({
  session,
}: {
  session?: Session | null;
}) {
  const router = useRouter();
  const failRouter = useFailRouter();

  const TossParam = useSearchParams();
  const orderId = TossParam.get("orderId") as string;
  const authKey = TossParam.get("authKey") as string;
  const plan = TossParam.get("plan") as string;
  const [price, setPrice] = useState(0);
  const [paymentResult, setPaymentResult] = useState<PaymentResult>();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(session?.user.email);

  useEffect(() => {
    const handleSuccess = async () => {
      // payments 객체 조회
      const requestSubsResult = await findReadyPaymentSubscription(orderId);

      if (requestSubsResult.result.isSuccess) {
        const requestSubs = requestSubsResult.result
          .data as PaymentSubscriptionType;

        if (requestSubs) {
          setPrice(requestSubs.amount as number);
          emailRef.current = requestSubs.paymentEmail;
        } else {
          failRouter(
            new CustomError(
              "NOT_FOUND_SUBSCRIPTION",
              "구독 정보를 찾을 수 없습니다.",
              {
                orderId,
              },
            ),
          );
        }
      } else if (requestSubsResult.error) {
        failRouter(requestSubsResult.error);
      } else {
        failRouter(
          new CustomError("UNKNOWN_SERVER_ERROR", "잘못된 요청입니다.", {
            orderId,
          }),
        );
      }
    };

    handleSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 결제 요청
  const onClickPayments = async () => {
    setIsLoading(true);

    if (emailRef.current) {
      // 결제 키 발급 요청, 구독에 대한 완료로 결제는 별도로 요청해야함
      const issueKeyResult = await issuePaymentsKey(authKey, orderId);

      if (issueKeyResult.result.isSuccess) {
        // 키 발급 후 결제 요청
        const result = await fetchFirstBillingPayments(
          emailRef.current,
          emailRef.current,
          orderId,
        );
        if (result.result.isSuccess) {
          setIsLoading(false);
          setPaymentResult(result.result.data as PaymentResult);
        } else {
          failRouter(toCustomError(issueKeyResult.error));
        }
      } else {
        failRouter(toCustomError(issueKeyResult.error));
      }
    } else {
      failRouter(
        new CustomError("INVALID_SESSION", "만료된 세션입니다", { orderId }),
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex h-[500px] w-[706px] flex-col items-center justify-center rounded-[25px] bg-white md:w-[300px]">
        {isLoading ? (
          <div className="flex h-[169px] w-[169px] animate-spin items-center justify-center rounded-full border-[15px] border-[#ECECEC] border-t-[#1273E4]">
            <div className="h-[120px] w-[120px] rounded-full bg-[#1273E4]"></div>
          </div>
        ) : paymentResult?.status === "DONE" ? (
          <div className="mb-[4.5rem] flex flex-col items-center justify-center gap-[13px]">
            <Image
              src="/images/payments/payment-success.png"
              alt="toss_success"
              width={65}
              height={65}
            />
            <span className="mt-[2.125rem] flex text-[38px] font-semibold text-[#020202] md:text-[24px]">
              결제 정보 처리 완료!
            </span>
            <p className="text-[28px] font-normal text-[#606060]"></p>
            <div className="mt-2 flex flex-col items-center justify-center gap-1">
              <p className="w-fit text-center text-[14px] font-normal text-[#606060] md:text-[12px]">
                도슨티 {plan} 플랜을 구매해주셔서 감사드립니다!
              </p>
              <p className="w-fit text-center text-[14px] font-normal text-[#606060] md:text-[12px]">
                구매 영수증은{" "}
                <Link
                  className="w-fit text-center text-[14px] font-semibold text-blue-500 hover:text-blue-300"
                  href={paymentResult.receiptUrl}
                  target="_blank"
                >
                  이 곳
                </Link>
                에서 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-[4.5rem] flex flex-col items-center justify-center gap-[13px]">
            <span className="mt-[2.125rem] flex text-[34px] font-semibold text-[#020202] md:whitespace-pre-wrap md:text-center md:text-[24px]">
              아래 정보를 확인하시고 결제를 진행해주세요!
            </span>
            <p className="text-[28px] font-normal text-[#606060]"></p>
            <div className="mt-2 flex flex-col gap-2 text-[20px]">
              <div className="flex gap-4">
                <p className="font-semibold text-[#606060]">
                  선택한 플랜:{plan}
                </p>
                <p className="font-semibold text-[#606060]">가격:{price}</p>
              </div>
            </div>
          </div>
        )}
        {isLoading ? null : paymentResult?.status === "DONE" ? (
          <div className="flex gap-[10px]">
            <button
              onClick={() => router.push("/")}
              className="flex h-[76px] w-[232px] items-center justify-center rounded-[15px] bg-[#EBEBEB] text-[22px] font-bold text-[#6C6C6C] hover:bg-[#d3d3d3] md:h-[70px] md:w-[200px] md:text-[20px]"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        ) : (
          <div className="flex gap-[10px]">
            <Link
              href={`${process.env.NEXT_PUBLIC_APPLICATION_URL}/fail?code=PAY_PROCESS_CANCELED&message=사용자에 의해 결제가 취소되었습니다.&orderId=${orderId}`}
              className="flex h-[76px] w-[232px] items-center justify-center rounded-[15px] bg-[#EBEBEB] text-[30px] font-bold text-[#6C6C6C] hover:bg-[#d3d3d3] md:h-[50px] md:w-[100px] md:text-[24px]"
            >
              취소
            </Link>
            <button
              onClick={onClickPayments}
              className="h-[76px] w-[244px] rounded-[15px] bg-[#1273E4] text-[30px] font-bold text-white hover:bg-[#5e68f6] md:h-[50px] md:w-[100px] md:text-[24px]"
            >
              결제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
