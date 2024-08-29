-- AlterEnum
ALTER TYPE "PaymentPlanType" ADD VALUE 'NO_PLAN';

-- RenameIndex
ALTER INDEX "paymentSubscriptions_lastOrderId_idx" RENAME TO "paymentSubscriptions_lastOrderId_key";
