"use server";

import {
  PaymentsResponse,
  PaymentSubscriptionType,
} from "@/domains/landing/types/types";
import { CustomError, toCustomError } from "@/common/utils/customError";
import prisma from "@/common/libs/PrismaService";
import { PaymentStatus } from "@prisma/client";

// 첫 결제전 구독정보 조회
export const findReadyPaymentSubscription = async (orderId: string) => {
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
    const subs = await prisma.paymentSubscription.findFirst({
      where: {
        lastOrderId: orderId,
        paymentStatus: PaymentStatus.UNPAID,
        lastPaidAt: null,
      },
      include: {
        paymentPlan: {
          select: {
            type: true,
          },
        },
      },
    });

    if (subs) {
      (subs as PaymentSubscriptionType).amount = subs?.amount.toNumber();
    }

    result.result.isSuccess = true;
    result.result.data = subs;

    return result;
  } catch (error) {
    result.error = toCustomError(error);
    console.error(result.error);
    return result;
  }
};
