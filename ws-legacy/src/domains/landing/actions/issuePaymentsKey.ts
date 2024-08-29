"use server";

import {
  CustomError,
  parseError,
  serializeError,
} from "@/common/utils/customError";
import {
  PaymentsResponse,
  PaymentSubscriptionType,
} from "@/domains/landing/types/types";
import { findReadyPaymentSubscription } from "@/domains/landing/actions/getReadyPaymentSubscription";
import { updateSubscription } from "@/domains/landing/actions/updateSubscription";
import { saveSubscriptionLog } from "@/domains/landing/actions/addSubscriptionLog";
import { PaymentOrderStatus } from "@prisma/client";

// 토스 API 인증키
const headerKey = process.env.TOSS_LIVE_HEADER_KEY!;

// 유저 정기결제 키 발급
export const issuePaymentsKey = async (authKey: string, orderId: string) => {
  const result: PaymentsResponse = {
    result: { isSuccess: false },
  };

  try {
    const requestSubsResult = await findReadyPaymentSubscription(orderId);
    if (!requestSubsResult?.result.data) {
      result.error = new CustomError(
        "NOT_FOUND_SUBSCRIPTION",
        "잘못된 주문 정보입니다.",
        { orderId },
      ).toObject();

      return result;
    }

    const requestSubs = requestSubsResult.result
      .data as PaymentSubscriptionType;

    // 키 발급 요청 - 키까지 발급되어야 구독 완료
    const tossKeyResponse = await fetch(
      "https://api.tosspayments.com/v1/billing/authorizations/issue",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${headerKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authKey: authKey,
          customerKey: requestSubs.customerKey,
        }),
      },
    );
    const tossKey = await tossKeyResponse.json();

    if (!tossKey?.billingKey) {
      result.error = new CustomError(
        "MISSING_BILLING_KEY",
        "키 발급에 실패하였습니다.",
        { orderId },
      ).toObject();
      return result;
    }

    // 구독정보 업데이트
    const updatedSubs = await updateSubscription(
      { orderId },
      {
        billingKey: tossKey.billingKey,
        paymentTypeDetail: tossKey.card?.number ? tossKey.card : undefined,
      },
    );
    if (!updatedSubs?.data.data) {
      result.error = new CustomError(
        "INVALID_TRANSACTION",
        `빌링키 발급중 오류가 발생했습니다. ${tossKey.billingKey}`,
        { orderId },
      ).toObject();
      return result;
    }

    // 구독 완료 로깅
    await saveSubscriptionLog(
      PaymentOrderStatus.COMPLETE_SUBSCRIPTION,
      updatedSubs.data.data as PaymentSubscriptionType,
    );

    result.result.isSuccess = true;

    return result;
  } catch (error) {
    result.error = parseError(serializeError(error));
  }

  return result;
};
