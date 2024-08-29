"use server";

import { CurrencyUnit, PaymentPlanType } from "@prisma/client";
import prisma from "@/common/libs/PrismaService";

export const findPaymentPlanByType = async (type: PaymentPlanType) => {
  try {
    if (!type) {
      return null;
    }

    return await prisma.paymentPlan.findFirst({
      where: {
        type: type,
        currency: CurrencyUnit.KRW,
        deletedAt: null,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};
