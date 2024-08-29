import { CustomError, CustomErrorType } from "@/common/utils/customError";
import {
  $Enums,
  CurrencyUnit,
  PaymentPlanType,
  PaymentStatus,
  PaymentSubscription,
  PaymentSubscriptionLog,
  PaymentType,
  Prisma,
} from "@prisma/client";
import Decimal = Prisma.Decimal;
import JsonValue = Prisma.JsonValue;
import PaymentMethod = $Enums.PaymentMethod;

export type FieldCardType = {
  title?: string;
  desc?: string;
  src: string;
  alt: string;
  fill?: boolean | false;
  reverse?: boolean;
  width?: number;
  height?: number;
};

export type FieldContentType = {
  title: string;
  bulletText: string;
  desc: string;
};

export type PaymentsResponse = {
  result: { isSuccess: boolean; data?: unknown };
  error?: CustomErrorType;
};

export type PaymentsUpsertResult = {
  data: {
    isSuccess: boolean;
    data?: null | PaymentSubscriptionLog | PaymentSubscription;
  };
  error?: CustomError | null;
};

export type PaymentSubscriptionType = {
  paymentPlan?: {
    type?: PaymentPlanType;
  };
  id: string;
  billingKey?: string | null;
  customerKey: string;
  customerName?: string;
  paymentStatus: PaymentStatus;
  userId: string;
  userDesc?: string | null;
  paymentEmail: string;
  paymentPlanId: string;
  paymentType: PaymentType;
  paymentTypeDetail?: JsonValue;
  amount: number | Decimal;
  currency: CurrencyUnit;
  lastOrderId?: string | null;
  startedAt?: string | Date | null;
  expireDate?: string | Date | null;
  lastPaidAt?: string | Date | null;
  nextPaymentDate?: string | Date | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
};

export type PaymentResult = {
  orderName: string;
  approvedAt: string;
  receiptUrl: string;
  totalAmount: number;
  method: PaymentMethod;
  paymentKey: string;
  orderId: string;
  status: string;
};

export type demoUserType = {
  purpose: string;
  name: string;
  email: string;
  createdAt: Date;
  demoDate: Date;
  companySize: string;
};
