/*
  Warnings:

  - You are about to drop the column `externalServiceId` on the `endUserSessions` table. All the data in the column will be lost.
  - You are about to drop the column `externalServiceUserId` on the `endUserSessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "endUserSessions" DROP CONSTRAINT "endUserSessions_externalServiceId_fkey";

-- AlterTable
ALTER TABLE "endUserSessions" DROP COLUMN "externalServiceId",
DROP COLUMN "externalServiceUserId";

-- AlterTable
ALTER TABLE "endUsers" ADD COLUMN     "externalServiceId" UUID;

-- AddForeignKey
ALTER TABLE "endUsers" ADD CONSTRAINT "endUsers_externalServiceId_fkey" FOREIGN KEY ("externalServiceId") REFERENCES "externalService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
