"use server";

import prisma from "@/common/libs/PrismaService";

export const addToBusinessPlanHistory = async ({
  type,
  filePaths,
  prompt,
  userId,
}: {
  type: "chochangpae" | "yechangpae";
  filePaths: string;
  prompt: string;
  userId: string;
}) => {
  try {
    return await prisma.businessPlanHistory.create({
      data: { type, filePaths, prompt, creatorId: userId },
    });
  } catch (err) {
    throw `Add to business plan history list ${err}`;
  }
};

export const addToBusinessPlanAutoWriteHistory = async ({
  type,
  question,
  answer,
  businessPlanHistoryId,
}: {
  type: "chochangpae" | "yechangpae";
  question: string;
  answer: string;
  businessPlanHistoryId: string;
}) => {
  try {
    await prisma.businessPlanAutoWriteHistory.create({
      data: { type, question, answer, businessPlanHistoryId },
    });
  } catch (err) {
    throw `Add to business plan auto write history list ${err}`;
  }
};

export const isFreeTrialAndBusinessPlanHistoryExceedOne = async ({
  userId,
  businessPlanType,
}: {
  userId: string;
  businessPlanType: "chochangpae" | "yechangpae";
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscription: { select: { type: true } },
        businessPlanHistory: { where: { type: businessPlanType } },
      },
    });

    if (!user) throw "No authorized";

    if (user.businessPlanHistory.length >= 1) return true;

    return false;
  } catch (err) {
    throw `Get User Subscription ${err}`;
  }
};

export const addToOrderFromNaverSmartStoreList = async ({
  name,
  email,
  orderNumber,
}: {
  name: string;
  email: string;
  orderNumber: string;
}) => {
  try {
    await prisma.orderFromNaverSmartStoreList.create({
      data: { name, email, orderNumber },
    });
  } catch (err) {
    throw `addToOrderFromNaverSmartStoreList ${err}`;
  }
};
