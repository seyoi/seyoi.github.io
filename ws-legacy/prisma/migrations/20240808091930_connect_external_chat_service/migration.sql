-- AlterTable
ALTER TABLE "endUserSessions"
ADD COLUMN "externalServiceId" UUID,
    ADD COLUMN "externalServiceUserId" TEXT;
-- CreateTable
CREATE TABLE "externalService" (
    "id" UUID NOT NULL,
    "apiKey" TEXT,
    "name" TEXT NOT NULL,
    "hostNameId" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    CONSTRAINT "externalService_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "externalService_name_hostNameId_key" ON "externalService"("name", "hostNameId");
-- AddForeignKey
ALTER TABLE "endUserSessions"
ADD CONSTRAINT "endUserSessions_externalServiceId_fkey" FOREIGN KEY ("externalServiceId") REFERENCES "externalService"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "externalService"
ADD CONSTRAINT "externalService_botId_fkey" FOREIGN KEY ("botId") REFERENCES "workspaceBots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
