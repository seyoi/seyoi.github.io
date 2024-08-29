-- CreateTable
CREATE TABLE "DemoUser" (
    "id" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "demoDate" TIMESTAMP(3),
    "companySize" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DemoUser_pkey" PRIMARY KEY ("id")
);
