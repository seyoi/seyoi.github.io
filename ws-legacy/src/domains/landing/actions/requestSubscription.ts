"use server";

import {
  ExecutedBy,
  PaymentOrderStatus,
  PaymentPlanType,
  PaymentStatus,
  PaymentType,
} from "@prisma/client";
import { PaymentsResponse } from "@/domains/landing/types/types";
import { CustomError, toCustomError } from "@/common/utils/customError";
import { findActiveUserSubscription } from "@/domains/landing/actions/getActiveUserSubscription";
import { findPaymentPlanByType } from "@/domains/landing/actions/getPaymentPlanByType";
import prisma from "@/common/libs/PrismaService";
import { uuidv4 } from "@firebase/util";
import { calcVat } from "@/domains/landing/utils/paymentsUtil";

// 구독 프로세스 시작
export async function requestSubscriptionStart(
  userId: string,
  email: string,
  plan: PaymentPlanType,
) {
  const result: PaymentsResponse = {
    result: { isSuccess: false },
  };

  try {
    if (!userId || !email) {
      result.error = new CustomError(
        "INVALID_REQUIRED_PARAM",
        "필수 파라미터가 누락되었습니다.",
      ).toObject();
      return result;
    }

    const userSubscription = await findActiveUserSubscription(userId);
    if (userSubscription) {
      result.error = new CustomError(
        "DUPLICATE_SUBSCRIPTION",
        "이미 구독 결제가 완료된 계정입니다.",
      ).toObject();
      return result;
    }

    // PaymentSubscription 신규 구독 생성
    const paymentPlan = await findPaymentPlanByType(plan);
    if (!paymentPlan) {
      result.error = new CustomError(
        "NOT_FOUND_PLAN",
        "구독 플랜 정보가 없습니다.",
      ).toObject();
      return result;
    }

    const now = new Date();

    // 구독 신청 정보 저장
    const newSubscription = await prisma.paymentSubscription.create({
      data: {
        customerKey: uuidv4(),
        customerName: email,
        paymentStatus: PaymentStatus.UNPAID,
        userId: userId,
        paymentEmail: email,
        paymentPlanId: paymentPlan.id,
        amount: paymentPlan.amount,
        currency: paymentPlan.currency,
        lastOrderId: uuidv4(),
        paymentType: PaymentType.CARD,
        createdAt: now,
        updatedAt: now,
      },
    });

    // 구독 신청 정보 로깅
    await prisma.paymentSubscriptionLog.create({
      data: {
        orderId: newSubscription.lastOrderId,
        paymentEmail: newSubscription.paymentEmail,
        customerKey: newSubscription.customerKey,
        customerName: newSubscription.customerName,
        orderStatus: PaymentOrderStatus.REQUEST_SUBSCRIPTION,
        paymentStatus: newSubscription.paymentStatus,
        paymentType: PaymentType.CARD,
        amount: newSubscription.amount,
        currency: newSubscription.currency,
        vat: calcVat(newSubscription.amount),
        userId: userId,
        paymentSubscriptionId: newSubscription.id,
        paymentPlanId: newSubscription.paymentPlanId,
        executedBy: ExecutedBy.USER,
        createdAt: now,
        updatedAt: now,
      },
    });

    result.result.isSuccess = true;
    result.result.data = {
      customerKey: newSubscription.customerKey,
      orderId: newSubscription.lastOrderId,
    };
    return result;
  } catch (err) {
    result.error = toCustomError(err).toObject();
    return result;
  }
}
