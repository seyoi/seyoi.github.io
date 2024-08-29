"use server";

// 구독 정보 업데이트
import { PaymentStatus, Prisma } from "@prisma/client";
import { PaymentsUpsertResult } from "@/domains/landing/types/types";
import prisma from "@/common/libs/PrismaService";
import { parseError, serializeError } from "@/common/utils/customError";

export const updateSubscription = async (
  key: { id?: string; orderId?: string },
  data: {
    billingKey?: string;
    paymentEmail?: string;
    customerName?: string;
    updatedAt?: Date;
    paymentTypeDetail?: Prisma.InputJsonValue;
    startedAt?: Date;
    lastPaidAt?: Date;
    nextPaymentDate?: Date;
    paymentStatus?: PaymentStatus;
    deletedAt?: Date;
  },
) => {
  const result: PaymentsUpsertResult = {
    data: { isSuccess: false },
    error: null,
  };

  try {
    if (Object.keys(data).length > 0) {
      result.data.data = await prisma.paymentSubscription.update({
        where: {
          id: key?.id,
          lastOrderId: key?.orderId,
        },
        data: { ...data, updatedAt: data.updatedAt || new Date() },
      });

      result.data.isSuccess = true;
    }
  } catch (error) {
    result.error = parseError(serializeError(error));
  }

  return result;
};
