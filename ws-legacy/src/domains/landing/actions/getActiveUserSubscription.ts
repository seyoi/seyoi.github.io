"use server";

import { PaymentStatus } from "@prisma/client";
import prisma from "@/common/libs/PrismaService";

export const findActiveUserSubscription = async (userId: string) => {
  try {
    if (!userId) {
      return null;
    }

    return await prisma.paymentSubscription.findFirst({
      where: {
        userId: userId,
        paymentStatus: PaymentStatus.PAID,
      },
      include: {
        paymentPlan: {
          select: {
            type: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};
