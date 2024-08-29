"use server";

import { $Enums, ExecutedBy, PaymentOrderStatus, Prisma } from "@prisma/client";
import PaymentMethod = $Enums.PaymentMethod;
import {
  PaymentSubscriptionType,
  PaymentsUpsertResult,
} from "@/domains/landing/types/types";
import { calcVat } from "@/domains/landing/utils/paymentsUtil";
import Decimal = Prisma.Decimal;
import prisma from "@/common/libs/PrismaService";
import { parseError, serializeError } from "@/common/utils/customError";

// 유저 결제 로깅
export const saveSubscriptionLog = async (
  orderStatus: PaymentOrderStatus,
  paymentSubs: PaymentSubscriptionType,
  payments?: {
    orderName: string;
    paymentMethod: PaymentMethod;
    paymentMethodDetail?: Prisma.InputJsonValue;
    vat?: number;
    country?: string;
    receiptUrl?: string;
    paymentKey?: string;
  },
) => {
  const result: PaymentsUpsertResult = {
    data: { isSuccess: false },
    error: null,
  };

  const now = new Date();

  const data = {
    orderId: paymentSubs.lastOrderId,
    paymentEmail: paymentSubs.paymentEmail,
    customerKey: paymentSubs.customerKey,
    customerName: paymentSubs.customerName,
    orderStatus: orderStatus,
    paymentStatus: paymentSubs.paymentStatus,
    paymentType: paymentSubs.paymentType,
    paymentTypeDetail: paymentSubs.paymentTypeDetail
      ? paymentSubs.paymentTypeDetail
      : undefined,
    amount: paymentSubs.amount,
    currency: paymentSubs.currency,
    vat: calcVat(new Decimal(paymentSubs.amount)),
    userId: paymentSubs.userId,
    paymentSubscriptionId: paymentSubs.id,
    paymentPlanId: paymentSubs.paymentPlanId,
    executedBy: ExecutedBy.USER,
    startedAt: paymentSubs.startedAt,
    expireDate: paymentSubs.expireDate,
    lastPaidAt: paymentSubs.lastPaidAt,
    nextPaymentDate: paymentSubs.nextPaymentDate,
    createdAt: now,
    updatedAt: now,
  };

  try {
    result.data.data = await prisma.paymentSubscriptionLog.create({
      data: {
        ...data,
        ...payments,
      },
    });

    result.data.isSuccess = true;
  } catch (error) {
    result.error = parseError(serializeError(error));
  }

  return result;
};
