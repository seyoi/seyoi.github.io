/*
  Warnings:

  - Made the column `createdAt` on table `DemoUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `demoDate` on table `DemoUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DemoUser" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE DATE,
ALTER COLUMN "demoDate" SET NOT NULL,
ALTER COLUMN "demoDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "demoDate" SET DATA TYPE DATE;
