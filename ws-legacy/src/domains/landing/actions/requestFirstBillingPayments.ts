"use server";

import {
  PaymentResult,
  PaymentsResponse,
  PaymentSubscriptionType,
} from "@/domains/landing/types/types";
import { findReadyPaymentSubscription } from "@/domains/landing/actions/getReadyPaymentSubscription";
import {
  CustomError,
  parseError,
  serializeError,
} from "@/common/utils/customError";
import { updateSubscription } from "@/domains/landing/actions/updateSubscription";
import { $Enums, Prisma } from ".prisma/client";
import PaymentMethod = $Enums.PaymentMethod;
import { saveSubscriptionLog } from "@/domains/landing/actions/addSubscriptionLog";
import { PaymentOrderStatus, PaymentStatus } from "@prisma/client";
import Decimal = Prisma.Decimal;
import {
  calcVat,
  getNextPaymentDate,
} from "@/domains/landing/utils/paymentsUtil";

// 토스 API 인증키
const headerKey = process.env.TOSS_LIVE_HEADER_KEY!;

// 구독 후, 첫 결제 요청
export const fetchFirstBillingPayments = async (
  email: string,
  userName: string,
  orderId: string,
) => {
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

      console.error(result.error);
      return result;
    }

    const requestSubs = requestSubsResult.result
      .data as PaymentSubscriptionType;

    // 구독 정보 업데이트 - tobe : 이메일, 신청자정보 변경 가능하도록
    const updatedSubsRes = await updateSubscription(
      { orderId },
      { paymentEmail: email, customerName: userName },
    );
    const updatedSubs = updatedSubsRes?.data.data as PaymentSubscriptionType;
    validateUpdatedSubscription(updatedSubs, orderId);

    const paymentMethod = PaymentMethod.CARD;
    let paymentMethodDetail = updatedSubs.paymentTypeDetail || {};
    if (!requestSubs.paymentPlan?.type) {
      result.error = new CustomError(
        "NOT_FOUND_PLAN",
        "구독 플랜 정보가 없습니다.",
        { orderId },
      ).toObject();

      console.error(result.error);
      return result;
    }
    const currentPlan = requestSubs.paymentPlan.type;

    // 결제 신청 로깅
    await saveSubscriptionLog(PaymentOrderStatus.REQUEST_PAYMENT, requestSubs, {
      orderName: currentPlan,
      paymentMethod: paymentMethod,
      paymentMethodDetail: paymentMethodDetail,
    });

    const orderCompleteResponse = await fetch(
      `https://api.tosspayments.com/v1/billing/${updatedSubs.billingKey}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${headerKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerKey: updatedSubs.customerKey,
          amount: (updatedSubs.amount as Decimal).toNumber(),
          orderId: orderId,
          orderName: currentPlan,
          customerEmail: email,
          customerName: userName,
          taxFreeAmount: 0,
        }),
      },
    );

    const completeData = await orderCompleteResponse.json();

    if (orderCompleteResponse.ok) {
      // 결제 완료
      if (completeData.status === "DONE") {
        const vat =
          completeData.vat && completeData.vat !== 0
            ? completeData.vat
            : calcVat(updatedSubs.amount as Decimal);

        const now = completeData.approvedAt
          ? new Date(completeData.approvedAt)
          : new Date();
        // 구독 정보 업데이트
        const completedSubsRes = await updateSubscription(
          { orderId },
          {
            paymentEmail: email,
            customerName: userName,
            startedAt: now,
            lastPaidAt: now,
            nextPaymentDate: getNextPaymentDate(now),
            updatedAt: now,
            paymentStatus: PaymentStatus.PAID,
          },
        );
        const completedSubs = completedSubsRes?.data
          .data as PaymentSubscriptionType;
        validateUpdatedSubscription(completedSubs, orderId);

        paymentMethodDetail = completeData.card || paymentMethodDetail;

        // 결제 신청 완료 로깅
        await saveSubscriptionLog(
          PaymentOrderStatus.COMPLETE_PAYMENT,
          completedSubs,
          {
            paymentKey: completeData.paymentKey,
            orderName: currentPlan!,
            paymentMethod: paymentMethod,
            paymentMethodDetail: paymentMethodDetail,
            vat: vat,
            country: completeData.country,
            receiptUrl: completeData.receipt?.url,
          },
        );

        const paymentResult: PaymentResult = {
          orderName: currentPlan,
          approvedAt: now.toISOString(),
          receiptUrl: completeData.receipt?.url,
          totalAmount: completeData.totalAmount,
          method: paymentMethod,
          paymentKey: completeData.paymentKey,
          orderId: orderId,
          status: completeData.status,
        };

        result.result.isSuccess = true;
        result.result.data = paymentResult;
        return result;
      } else {
        const message = {
          status: completeData.status,
          failure: completeData.failure,
        };
        result.error = new CustomError(
          "FAILED_TOSS_PAYMENTS",
          JSON.stringify(message),
          { orderId },
        ).toObject();

        console.error(result.error);
        return result;
      }
    } else {
      result.error = new CustomError(
        "FAILED_TOSS_PAYMENTS",
        JSON.stringify(completeData),
        { orderId },
      ).toObject();

      console.error(result.error);
      return result;
    }
  } catch (error) {
    if (error instanceof CustomError) {
      result.error = error.toObject();
    } else {
      const customError = parseError(serializeError(error));
      if (orderId) {
        customError.data = { orderId };
      }
      result.error = customError.toObject();
    }

    console.error(result.error);
    return result;
  }
};

const validateUpdatedSubscription = (
  data: PaymentSubscriptionType,
  orderId?: string,
) => {
  if (!data) {
    throw new CustomError(
      "INVALID_TRANSACTION",
      `구독 정보 업데이트중 오류가 발생했습니다.`,
      orderId ? { orderId } : undefined,
    );
  }

  return true;
};
