/*
  Warnings:

  - You are about to drop the column `enterpriseId` on the `workspaces` table. All the data in the column will be lost.
  - You are about to drop the `integrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studioChats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studioMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_userId_fkey";

-- DropForeignKey
ALTER TABLE "studioChats" DROP CONSTRAINT "studioChats_integrationId_fkey";

-- DropForeignKey
ALTER TABLE "studioMessages" DROP CONSTRAINT "studioMessages_chatId_fkey";

-- DropIndex
DROP INDEX "workspaces_enterpriseId_key";

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "enterpriseId";

-- DropTable
DROP TABLE "integrations";

-- DropTable
DROP TABLE "studioChats";

-- DropTable
DROP TABLE "studioMessages";

-- DropEnum
DROP TYPE "StudioChatType";

-- DropEnum
DROP TYPE "StudioIntegrationType";

-- DropEnum
DROP TYPE "StudioMessageEvaluationType";

-- DropEnum
DROP TYPE "StudioMessageStatusType";

-- DropEnum
DROP TYPE "StudioMessageType";
