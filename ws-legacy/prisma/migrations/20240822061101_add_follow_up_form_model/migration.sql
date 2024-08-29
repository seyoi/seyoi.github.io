-- CreateTable
CREATE TABLE "followUpForms" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "messageId" TEXT NOT NULL,

    CONSTRAINT "followUpForms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "followUpForms_messageId_key" ON "followUpForms"("messageId");

-- AddForeignKey
ALTER TABLE "followUpForms" ADD CONSTRAINT "followUpForms_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
