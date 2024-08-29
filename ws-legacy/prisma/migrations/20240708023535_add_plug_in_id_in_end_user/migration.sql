-- AlterTable
ALTER TABLE "endUsers" ADD COLUMN     "plugInId" TEXT;

-- AddForeignKey
ALTER TABLE "endUsers" ADD CONSTRAINT "endUsers_plugInId_fkey" FOREIGN KEY ("plugInId") REFERENCES "workspacePlugIns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
