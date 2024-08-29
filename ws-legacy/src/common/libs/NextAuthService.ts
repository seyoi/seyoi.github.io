import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { getServerSession, type NextAuthOptions } from "next-auth";
import prisma from "@/common/libs/PrismaService";
import { mailService } from "./emails/EmailService";
import { ServerAPI } from "@/server/service/API";
import type { AccountResp } from "@/server/types/Account";

class NextAuthService {
  #options: NextAuthOptions;
  constructor() {
    this.#options = {
      adapter: PrismaAdapter(prisma),
      providers: [
        EmailProvider({
          from: mailService.getFrom(),
          server: mailService.getServer(),
          sendVerificationRequest: async ({ identifier: email, url }) => {
            await mailService.sendMagicLink({ to: email, magicLinkUrl: url });
          },
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          allowDangerousEmailAccountLinking: true,
        }),
        KakaoProvider({
          clientId: process.env.KAKAO_CLIENT_ID as string,
          clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
          allowDangerousEmailAccountLinking: true,
        }),
      ],
      callbacks: {
        session: async ({ session, user }) => {
          session.user = user;

          return session;
        },
      },
      events: {
        createUser: async ({ user }) => {
          const data = await ServerAPI<AccountResp>({
            pathname: "/api/v1/account/items",
            method: "POST",
            body: JSON.stringify({ baseName: user.email }),
          });

          const acntUid = data.item?.uid;

          await prisma.user.update({
            where: { id: user.id },
            data: {
              acntUid,
            },
          });
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
    };
  }

  getOptions() {
    return this.#options;
  }

  getHandler() {
    return NextAuth(this.getOptions());
  }

  async getSession() {
    return await getServerSession(this.getOptions());
  }

  async getUser() {
    const session = await this.getSession();
    const user = session?.user;
    return user;
  }

  async getAcntUid() {
    const user = await this.getUser();
    const acntUid = user?.acntUid;
    return acntUid;
  }
}

export const nextAuthService = new NextAuthService();
