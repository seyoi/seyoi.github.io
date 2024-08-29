"use server";

import { PaymentsResponse } from "@/domains/landing/types/types";
import { CustomError, toCustomError } from "@/common/utils/customError";
import { findActiveUserSubscription } from "@/domains/landing/actions/getActiveUserSubscription";

export async function validateUserPayments(
  userId: string,
): Promise<PaymentsResponse> {
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
    // 사용자가 이미 구독 결제를 완료한 경우
    if (userSubscription) {
      result.error = new CustomError(
        "DUPLICATE_SUBSCRIPTION",
        "이미 구독 결제가 완료된 계정입니다.",
      ).toObject();
      return result;
    }

    result.result.isSuccess = true;
    result.result.data = { isValid: true };
    return result;
  } catch (err) {
    result.error = toCustomError(err).toObject();
    return result;
  }
}
