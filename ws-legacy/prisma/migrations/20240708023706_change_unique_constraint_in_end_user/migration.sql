/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,plugInId,veilId]` on the table `endUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "endUsers_workspaceId_veilId_key";

-- CreateIndex
CREATE UNIQUE INDEX "endUsers_workspaceId_plugInId_veilId_key" ON "endUsers"("workspaceId", "plugInId", "veilId");
