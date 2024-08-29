"use server";

import {
  PaymentsResponse,
  PaymentSubscriptionType,
} from "@/domains/landing/types/types";
import { CustomError, toCustomError } from "@/common/utils/customError";

import { updateSubscription } from "@/domains/landing/actions/updateSubscription";
import prisma from "@/common/libs/PrismaService";
import { PaymentOrderStatus, Prisma } from "@prisma/client";
import InputJsonValue = Prisma.InputJsonValue;
import { findReadyPaymentSubscription } from "@/domains/landing/actions/getReadyPaymentSubscription";

// 구독, 결제 실패 처리
export const addFailedLog = async (
  code: string,
  message: string,
  orderId: string,
) => {
  const result: PaymentsResponse = {
    result: { isSuccess: false },
  };

  if (!orderId) {
    result.error = new CustomError(
      "INVALID_REQUIRED_PARAM",
      "필수 파라미터가 누락되었습니다.",
    ).toObject();
    console.error(result.error);
    return result;
  }

  try {
    // 결제전 항목은 삭제처리
    const readyPaymentsSubsResult = await findReadyPaymentSubscription(orderId);
    if (readyPaymentsSubsResult.result.data) {
      const paymentSubs = readyPaymentsSubsResult.result
        .data as PaymentSubscriptionType;
      const now = new Date();
      await updateSubscription(
        { id: paymentSubs.id },
        { deletedAt: now, updatedAt: now },
      );
    }

    // 로깅
    const subsLog = await prisma.paymentSubscriptionLog.findFirst({
      where: {
        orderId: orderId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (subsLog) {
      // 이미 실패 처리된 주문의 중복 실행 방지
      if (
        (subsLog.orderStatus === PaymentOrderStatus.FAILED_SUBSCRIPTION ||
          subsLog.orderStatus === PaymentOrderStatus.FAILED_PAYMENT) &&
        subsLog.failureCode === code
      ) {
        result.error = new CustomError(
          "DUPLICATED_REQUEST",
          "중복된 요청입니다.",
        ).toObject();
        console.error(result.error);
        return result;
      }

      const failOrderStatus: PaymentOrderStatus =
        subsLog.orderStatus === PaymentOrderStatus.REQUEST_SUBSCRIPTION
          ? PaymentOrderStatus.FAILED_SUBSCRIPTION
          : PaymentOrderStatus.FAILED_PAYMENT;

      const logResult = await prisma.paymentSubscriptionLog.create({
        data: {
          orderId: subsLog.orderId,
          orderName: subsLog.orderName,
          paymentEmail: subsLog.paymentEmail,
          billingKey: subsLog.billingKey,
          paymentKey: subsLog.paymentKey,
          customerKey: subsLog.customerKey,
          customerName: subsLog.customerName,
          orderStatus: failOrderStatus,
          paymentStatus: subsLog.paymentStatus,
          paymentType: subsLog.paymentType,
          paymentTypeDetail:
            (subsLog.paymentTypeDetail as InputJsonValue) || undefined,
          paymentMethod: subsLog.paymentMethod,
          paymentMethodDetail:
            (subsLog.paymentMethodDetail as InputJsonValue) || undefined,
          amount: subsLog.amount,
          currency: subsLog.currency,
          vat: subsLog.vat,
          responseStatus: undefined,
          failureCode: code,
          failureMessage: message,
          userId: subsLog.userId,
          userDesc: subsLog.userDesc,
          paymentSubscriptionId: subsLog.paymentSubscriptionId,
          paymentPlanId: subsLog.paymentPlanId,
          receiptUrl: subsLog.receiptUrl,
          country: subsLog.country,
          startedAt: subsLog.startedAt,
          expireDate: subsLog.expireDate,
          lastPaidAt: subsLog.lastPaidAt,
          nextPaymentDate: subsLog.nextPaymentDate,
          executedBy: subsLog.executedBy,
          updatedAt: new Date(),
        },
      });

      result.result.isSuccess = true;
      result.result.data = { id: logResult.id, orderId: orderId };
    } else {
      result.error = new CustomError(
        "NOT_FOUND_RESOURCES",
        "요청된 로그 정보를 찾을 수 없습니다.",
      ).toObject();
      console.error(result.error);
      return result;
    }
  } catch (error) {
    result.error = toCustomError(error);
    console.error(result.error);
    return result;
  }
};
