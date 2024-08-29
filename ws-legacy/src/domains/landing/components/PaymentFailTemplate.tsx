"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { addFailedLog } from "@/domains/landing/actions/addFailSubscriptionLog";

export default function PaymentFailTemplate() {
  const TossParam = useSearchParams();
  const errorCode = TossParam.get("code");
  const errorMessage = TossParam.get("message");
  const orderId = TossParam.get("orderId");

  useEffect(() => {
    const tossErrorHandler = async () => {
      if (orderId) {
        const code = errorCode || "INVALID_SERVER_ERROR";
        const message = errorMessage || "알 수 없는 오류입니다";
        await addFailedLog(code, message, orderId);
      }
    };

    tossErrorHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex h-[500px] w-[706px] flex-col items-center justify-center rounded-[25px] bg-white md:w-[300px]">
        <Image
          src="/images/payments/payment-fail.png"
          alt="toss_fail"
          width={65}
          height={65}
        />
        <div className="mb-[4.5rem] flex flex-col items-center justify-center gap-[13px]">
          <span className="mt-[2.125rem] flex text-[38px] font-semibold text-[#020202] md:text-[24px]">
            결제가<p className="ml-[5px] text-red-400">취소</p>되었습니다.
          </span>
          <p className="text-[28px] font-normal text-[#606060] md:text-[18px]">
            아래 정보를 다시 확인해주세요.
          </p>
          <div className="mt-2 flex flex-col items-center gap-1">
            <p className="text-[14px] font-normal text-[#606060]">
              {errorCode}
            </p>
            <p className="text-[14px] font-normal text-[#606060]">
              {errorCode === "DUPLICATED_ORDER_ID "
                ? "이미 승인이 진행된 중복된 이메일 입니다. 다른 이메일로 진행해주세요."
                : ` ${errorMessage} `}
            </p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <Link
            href="/"
            className="flex h-[76px] w-[232px] items-center justify-center rounded-[15px] bg-[#EBEBEB] text-[30px] font-bold text-[#6C6C6C] md:h-[50px] md:w-[100px] md:text-[24px]"
          >
            취소
          </Link>
          <Link
            href="/#plan"
            replace={true}
            className={`flex h-[76px] w-[244px] items-center justify-center rounded-[15px] bg-black text-[30px] font-bold text-white md:h-[50px] md:w-[100px] md:text-[16px] ${
              errorCode === "DUPLICATE_ORDER_ID" ? "hidden" : "block"
            }`}
          >
            다시 결제하기
          </Link>
        </div>
      </div>
    </div>
  );
}
