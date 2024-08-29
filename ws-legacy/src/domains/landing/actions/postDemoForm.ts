"use server";

import prisma from "@/common/libs/PrismaService";
import { demoUserType } from "../types/types";

export async function postDemoForm({
  purpose,
  name,
  email,
  demoDate,
  createdAt,
  companySize,
}: demoUserType) {
  try {
    const demo = await prisma.demoUser.create({
      data: {
        purpose: purpose,
        name: name,
        email: email,
        createdAt: createdAt,
        demoDateAt: demoDate,
        companySize: companySize,
      },
    });
    return demo;
  } catch (err) {
    console.error(err);
  }
}
