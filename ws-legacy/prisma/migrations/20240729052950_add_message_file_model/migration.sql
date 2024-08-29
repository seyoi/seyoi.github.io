-- CreateTable
CREATE TABLE "messageFiles" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "path" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "messageFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messageFiles" ADD CONSTRAINT "messageFiles_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
