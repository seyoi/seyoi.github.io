/*
  Warnings:

  - You are about to drop the column `demoDate` on the `DemoUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DemoUser" DROP COLUMN "demoDate",
ADD COLUMN     "demoDateAt" TIMESTAMP(3);
