/*
  Warnings:

  - You are about to drop the column `orderId` on the `paymentSubscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `paymentUserId` on the `paymentSubscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `paymentSubscriptions` table. All the data in the column will be lost.
  - You are about to drop the `paymentUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentkeys` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[billingKey]` on the table `paymentSubscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerKey]` on the table `paymentSubscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `paymentSubscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `paymentSubscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerKey` to the `paymentSubscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentPlanId` to the `paymentSubscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `paymentSubscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `paymentSubscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "CurrencyUnit" AS ENUM ('KRW', 'USD', 'JPY');

-- CreateEnum
CREATE TYPE "PaymentOrderStatus" AS ENUM ('REQUEST_SUBSCRIPTION', 'COMPLETE_SUBSCRIPTION', 'FAILED_SUBSCRIPTION', 'REQUEST_PAYMENT', 'COMPLETE_PAYMENT', 'FAILED_PAYMENT');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CARD', 'CREDIT');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'CREDIT');

-- CreateEnum
CREATE TYPE "ExecutedBy" AS ENUM ('SYSTEM_BATCH', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PaymentPlanType" AS ENUM ('FREE_TRIAL', 'BASIC', 'PRO', 'ENTERPRISE');

-- DropForeignKey
ALTER TABLE "paymentSubscriptions" DROP CONSTRAINT "paymentSubscriptions_paymentUserId_fkey";

-- DropForeignKey
ALTER TABLE "paymentkeys" DROP CONSTRAINT "paymentkeys_paymentUserId_fkey";

-- DropIndex
DROP INDEX "paymentSubscriptions_orderId_key";

-- DropIndex
DROP INDEX "paymentSubscriptions_paymentUserId_key";

-- AlterTable
ALTER TABLE "paymentSubscriptions" DROP COLUMN "orderId",
DROP COLUMN "paymentUserId",
DROP COLUMN "plan",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "billingKey" TEXT,
ADD COLUMN     "currency" "CurrencyUnit" NOT NULL,
ADD COLUMN     "customerKey" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "expireDate" DATE,
ADD COLUMN     "lastPaidAt" TIMESTAMP(3),
ADD COLUMN     "nextPaymentDate" DATE,
ADD COLUMN     "paymentEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "paymentPlanId" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL,
ADD COLUMN     "lastOrderId" TEXT,
ADD COLUMN     "paymentType" "PaymentType" NOT NULL,
ADD COLUMN     "paymentTypeDetail" JSONB,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "userDesc" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "paymentUsers";

-- DropTable
DROP TABLE "paymentkeys";

-- CreateTable
CREATE TABLE "paymentSubscriptionLogs" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "orderName" TEXT,
    "paymentEmail" TEXT NOT NULL,
    "billingKey" TEXT,
    "paymentKey" TEXT,
    "customerKey" TEXT NOT NULL,
    "customerName" TEXT,
    "orderStatus" "PaymentOrderStatus" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "paymentTypeDetail" JSONB,
    "paymentMethod" "PaymentMethod",
    "paymentMethodDetail" JSONB,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" "CurrencyUnit" NOT NULL,
    "vat" DECIMAL(65,30) NOT NULL,
    "responseStatus" TEXT,
    "failureCode" TEXT,
    "failureMessage" TEXT,
    "userId" TEXT NOT NULL,
    "userDesc" TEXT,
    "paymentSubscriptionId" TEXT NOT NULL,
    "paymentPlanId" TEXT NOT NULL,
    "receiptUrl" TEXT,
    "country" TEXT,
    "executedBy" "ExecutedBy" NOT NULL,
    "startedAt" TIMESTAMP(3),
    "expireDate" DATE,
    "lastPaidAt" TIMESTAMP(3),
    "nextPaymentDate" DATE,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "paymentSubscriptionLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentPlans" (
    "id" TEXT NOT NULL,
    "type" "PaymentPlanType" NOT NULL DEFAULT 'FREE_TRIAL',
    "planName" TEXT NOT NULL DEFAULT '',
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" "CurrencyUnit" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "paymentPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userCredits" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "creditUnit" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expireDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "userCredits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "paymentSubscriptionLogs_orderId_idx" ON "paymentSubscriptionLogs"("orderId");

-- CreateIndex
CREATE INDEX "paymentSubscriptionLogs_userId_idx" ON "paymentSubscriptionLogs"("userId");

-- CreateIndex
CREATE INDEX "paymentSubscriptionLogs_orderStatus_idx" ON "paymentSubscriptionLogs"("orderStatus");

-- CreateIndex
CREATE INDEX "paymentSubscriptionLogs_paymentType_idx" ON "paymentSubscriptionLogs"("paymentType");

-- CreateIndex
CREATE INDEX "paymentSubscriptionLogs_createdAt_idx" ON "paymentSubscriptionLogs"("createdAt");

-- CreateIndex
CREATE INDEX "paymentPlans_type_idx" ON "paymentPlans"("type");

-- CreateIndex
CREATE INDEX "userCredits_expireDate_idx" ON "userCredits"("expireDate");

-- CreateIndex
CREATE UNIQUE INDEX "paymentSubscriptions_billingKey_key" ON "paymentSubscriptions"("billingKey");

-- CreateIndex
CREATE UNIQUE INDEX "paymentSubscriptions_customerKey_key" ON "paymentSubscriptions"("customerKey");

-- CreateIndex
CREATE INDEX "paymentSubscriptions_paymentEmail_idx" ON "paymentSubscriptions"("paymentEmail");

-- CreateIndex
CREATE INDEX "paymentSubscriptions_paymentStatus_idx" ON "paymentSubscriptions"("paymentStatus");

-- CreateIndex
CREATE UNIQUE INDEX "paymentSubscriptions_lastOrderId_idx" ON "paymentSubscriptions"("lastOrderId");

-- CreateIndex
CREATE INDEX "paymentSubscriptions_lastPaidAt_idx" ON "paymentSubscriptions"("lastPaidAt");

-- CreateIndex
CREATE INDEX "paymentSubscriptions_nextPaymentDate_idx" ON "paymentSubscriptions"("nextPaymentDate");

-- CreateIndex
CREATE INDEX "paymentSubscriptions_expireDate_idx" ON "paymentSubscriptions"("expireDate");

-- AddForeignKey
ALTER TABLE "paymentSubscriptions" ADD CONSTRAINT "paymentSubscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentSubscriptions" ADD CONSTRAINT "paymentSubscriptions_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "paymentPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentSubscriptionLogs" ADD CONSTRAINT "paymentSubscriptionLogs_paymentSubscriptionId_fkey" FOREIGN KEY ("paymentSubscriptionId") REFERENCES "paymentSubscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentSubscriptionLogs" ADD CONSTRAINT "paymentSubscriptionLogs_paymentPlanId_fkey" FOREIGN KEY ("paymentPlanId") REFERENCES "paymentPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCredits" ADD CONSTRAINT "userCredits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

