import { Prisma } from ".prisma/client";
import Decimal = Prisma.Decimal;

export const calcVat = (amount: Decimal) => {
  // (결제금액 - 면세금액) / 11 후, 반올림
  return amount.div(11).toDecimalPlaces(0);
};

// 다음 결제일자 구하기
export const getNextPaymentDate = (now: Date) => {
  const nextPaymentDate = new Date(now.setMonth(now.getMonth() + 1));
  nextPaymentDate.setDate(nextPaymentDate.getDate() - 1);

  return nextPaymentDate;
};
