"use server";

import { PaymentsResponse } from "@/domains/landing/types/types";
import { CustomError, toCustomError } from "@/common/utils/customError";
import { findActiveUserSubscription } from "@/domains/landing/actions/getActiveUserSubscription";

export async function getUserPaymentPlan(userId: string) {
  const result: PaymentsResponse = {
    result: { isSuccess: false },
  };

  try {
    if (!userId) {
      result.error = new CustomError(
        "INVALID_REQUIRED_PARAM",
        "필수 파라미터가 누락되었습니다.",
      ).toObject();
      return result;
    }
    const userSubscription = await findActiveUserSubscription(userId);
    if (userSubscription) {
      result.result.isSuccess = true;
      result.result.data = { plan: userSubscription.paymentPlan.type };
    }

    return result;
  } catch (err) {
    console.error(err);
    result.error = toCustomError(err).toObject();
    return result;
  }
}
