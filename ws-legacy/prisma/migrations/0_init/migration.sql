-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE_TRIAL', 'ESSENTIAL', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "StudioIntegrationType" AS ENUM ('WIDGET', 'TEST_WIDGET');

-- CreateEnum
CREATE TYPE "StudioChatType" AS ENUM ('USER', 'TEST');

-- CreateEnum
CREATE TYPE "StudioMessageType" AS ENUM ('USER', 'BOT', 'AGENT', 'FORM');

-- CreateEnum
CREATE TYPE "StudioMessageStatusType" AS ENUM ('PENDING', 'SENT', 'ERROR');

-- CreateEnum
CREATE TYPE "StudioMessageEvaluationType" AS ENUM ('GOOD', 'BAD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userCode" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "acntUid" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationTokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "welcomeMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "enterpriseId" TEXT,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceMembers" (
    "id" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "workspaceMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceRoles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "workspaceRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceInvitations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "workspaceInvitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endUsers" (
    "id" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "veilId" TEXT NOT NULL,
    "currentChatId" TEXT,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "endUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endUserChats" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'open',
    "notes" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "firstAskedAt" TIMESTAMP(3),
    "handling" TEXT,
    "followerIds" TEXT[],
    "currentMessageId" TEXT,
    "endUserId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "assigneeId" TEXT,

    CONSTRAINT "endUserChats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "plainText" TEXT,
    "form" JSONB,
    "button" JSONB,
    "scenario" JSONB,
    "personId" TEXT NOT NULL,
    "personType" TEXT NOT NULL,
    "endUserChatId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endUserSessions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "personId" TEXT NOT NULL,
    "personType" TEXT NOT NULL,
    "unreadCount" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "endUserChatId" TEXT NOT NULL,

    CONSTRAINT "endUserSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceBots" (
    "id" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "botClsUid" TEXT,
    "welcomeMessage" TEXT,
    "workspaceId" TEXT NOT NULL,
    "plugInId" TEXT,

    CONSTRAINT "workspaceBots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspacePlugIns" (
    "id" TEXT NOT NULL,
    "buttonImageUrl" TEXT,
    "buttonLabelText" TEXT,
    "themeColor" TEXT,
    "marginX" INTEGER DEFAULT 24,
    "marginY" INTEGER DEFAULT 24,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "workspacePlugIns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceScenarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "currentPlotId" TEXT,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "workspaceScenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspacePlots" (
    "id" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "scenarioId" TEXT NOT NULL,

    CONSTRAINT "workspacePlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businessPlanHistory" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "filePaths" TEXT,
    "prompt" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "businessPlanHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businessPlanAutoWriteHistory" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "businessPlanHistoryId" TEXT NOT NULL,

    CONSTRAINT "businessPlanAutoWriteHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderFromNaverSmartStoreList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "orderFromNaverSmartStoreList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "type" "SubscriptionType" NOT NULL DEFAULT 'FREE_TRIAL',
    "userId" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "type" "StudioIntegrationType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "bottomSpacing" INTEGER NOT NULL,
    "sideSpacing" INTEGER NOT NULL,
    "botClsUid" TEXT NOT NULL,
    "acntUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studioChats" (
    "id" TEXT NOT NULL,
    "type" "StudioChatType" NOT NULL,
    "userEmail" TEXT,
    "botClsUid" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "firebaseAuthUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "studioChats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studioMessages" (
    "id" TEXT NOT NULL,
    "type" "StudioMessageType" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "status" "StudioMessageStatusType" NOT NULL,
    "chatSources" JSONB[],
    "evaluation" "StudioMessageEvaluationType",
    "userEmail" TEXT,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "studioMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isPaid" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "paymentUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentkeys" (
    "id" TEXT NOT NULL,
    "billingKey" TEXT NOT NULL,
    "customerKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "paymentUserId" TEXT NOT NULL,

    CONSTRAINT "paymentkeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentSubscriptions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'FREE_TRIAL',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "paymentUserId" TEXT NOT NULL,

    CONSTRAINT "paymentSubscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userCode_key" ON "users"("userCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userCode_email_key" ON "users"("userCode", "email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verificationTokens_token_key" ON "verificationTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationTokens_identifier_token_key" ON "verificationTokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_enterpriseId_key" ON "workspaces"("enterpriseId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceMembers_userId_workspaceId_key" ON "workspaceMembers"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceInvitations_workspaceId_key" ON "workspaceInvitations"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "endUsers_currentChatId_key" ON "endUsers"("currentChatId");

-- CreateIndex
CREATE UNIQUE INDEX "endUsers_workspaceId_veilId_key" ON "endUsers"("workspaceId", "veilId");

-- CreateIndex
CREATE UNIQUE INDEX "endUserChats_currentMessageId_key" ON "endUserChats"("currentMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceBots_plugInId_key" ON "workspaceBots"("plugInId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceScenarios_currentPlotId_key" ON "workspaceScenarios"("currentPlotId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_paymentId_key" ON "subscriptions"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "integrations_botClsUid_type_key" ON "integrations"("botClsUid", "type");

-- CreateIndex
CREATE UNIQUE INDEX "studioChats_type_botClsUid_integrationId_firebaseAuthUid_key" ON "studioChats"("type", "botClsUid", "integrationId", "firebaseAuthUid");

-- CreateIndex
CREATE UNIQUE INDEX "paymentUsers_email_key" ON "paymentUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "paymentkeys_paymentUserId_key" ON "paymentkeys"("paymentUserId");

-- CreateIndex
CREATE UNIQUE INDEX "paymentSubscriptions_orderId_key" ON "paymentSubscriptions"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "paymentSubscriptions_paymentUserId_key" ON "paymentSubscriptions"("paymentUserId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceMembers" ADD CONSTRAINT "workspaceMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceMembers" ADD CONSTRAINT "workspaceMembers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceMembers" ADD CONSTRAINT "workspaceMembers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "workspaceRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceRoles" ADD CONSTRAINT "workspaceRoles_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceInvitations" ADD CONSTRAINT "workspaceInvitations_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUsers" ADD CONSTRAINT "endUsers_currentChatId_fkey" FOREIGN KEY ("currentChatId") REFERENCES "endUserChats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUsers" ADD CONSTRAINT "endUsers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUserChats" ADD CONSTRAINT "endUserChats_currentMessageId_fkey" FOREIGN KEY ("currentMessageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUserChats" ADD CONSTRAINT "endUserChats_endUserId_fkey" FOREIGN KEY ("endUserId") REFERENCES "endUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUserChats" ADD CONSTRAINT "endUserChats_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUserChats" ADD CONSTRAINT "endUserChats_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "workspaceMembers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_endUserChatId_fkey" FOREIGN KEY ("endUserChatId") REFERENCES "endUserChats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUserSessions" ADD CONSTRAINT "endUserSessions_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endUserSessions" ADD CONSTRAINT "endUserSessions_endUserChatId_fkey" FOREIGN KEY ("endUserChatId") REFERENCES "endUserChats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceBots" ADD CONSTRAINT "workspaceBots_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceBots" ADD CONSTRAINT "workspaceBots_plugInId_fkey" FOREIGN KEY ("plugInId") REFERENCES "workspacePlugIns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspacePlugIns" ADD CONSTRAINT "workspacePlugIns_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceScenarios" ADD CONSTRAINT "workspaceScenarios_currentPlotId_fkey" FOREIGN KEY ("currentPlotId") REFERENCES "workspacePlots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceScenarios" ADD CONSTRAINT "workspaceScenarios_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspacePlots" ADD CONSTRAINT "workspacePlots_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "workspaceScenarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessPlanHistory" ADD CONSTRAINT "businessPlanHistory_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessPlanAutoWriteHistory" ADD CONSTRAINT "businessPlanAutoWriteHistory_businessPlanHistoryId_fkey" FOREIGN KEY ("businessPlanHistoryId") REFERENCES "businessPlanHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studioChats" ADD CONSTRAINT "studioChats_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studioMessages" ADD CONSTRAINT "studioMessages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "studioChats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentkeys" ADD CONSTRAINT "paymentkeys_paymentUserId_fkey" FOREIGN KEY ("paymentUserId") REFERENCES "paymentUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentSubscriptions" ADD CONSTRAINT "paymentSubscriptions_paymentUserId_fkey" FOREIGN KEY ("paymentUserId") REFERENCES "paymentUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

