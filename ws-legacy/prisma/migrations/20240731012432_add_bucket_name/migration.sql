/*
  Warnings:

  - Added the required column `bucketName` to the `messageFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messageFiles" ADD COLUMN     "bucketName" TEXT NOT NULL;
