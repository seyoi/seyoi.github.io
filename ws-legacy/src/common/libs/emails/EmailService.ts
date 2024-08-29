import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { EmailServiceConfig } from "../../types/EmailServiceConfig";
import fs from "fs/promises";
import path from "path";
import { encodeJWT } from "@/common/utils/jwtUtil";
import { SendEmailNotiType } from "@/domains/helpdesk/types/helpdesk.type";

class EmailService {
  #config: EmailServiceConfig;
  #transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.#config = {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      service: process.env.EMAIL_SERVICE,
      from: process.env.EMAIL_FROM,
    };
    this.#transporter = nodemailer.createTransport(this.#config);
  }

  getFrom = () => {
    return this.#config.from;
  };

  getServer = () => {
    return {
      host: this.#config.host,
      port: this.#config.port,
      auth: this.#config.auth,
      server: this.#config.service,
    };
  };

  sendMagicLink = async ({
    to,
    magicLinkUrl,
  }: {
    to: string;
    magicLinkUrl: string;
  }) => {
    try {
      const { from } = this.#config;

      await this.#transporter.sendMail({
        from,
        to,
        subject: `Sign-in with magic link`,
        html: `
          <div style="background-color:#f1f1f1;margin:0;padding:0">
            <div style="max-width:480px;margin:0 auto;padding:16px 0">
              <div style="color:#222222;font-size:24px;font-weight:600">
                Welcome!
              </div>
              <br />
              <div style="color:#222222">
                Click this link to sign in: 
                <strong>
                  <a href="${magicLinkUrl}" target="_blank">
                    CLICK HERE
                  </a>
                </strong>
              </div>
              <br />
              <div style="color:#222222">
                Cheers,<br />
                ${from}
              </div>
            </div>
            <br />
            <div style="text:757575;>This mail was sent from docenty.ai</div>
          </div>
        `,
        text: `
          Welcome!
        
          You may now sign in using this link: ${magicLinkUrl}
              
          Cheers,
          ${from}
        `,
      });
    } catch (error) {
      throw `sendMagicLink: ${error}`;
    }
  };

  sendEmailNotification = async ({
    workspaceName,
    workspaceId,
    to,
    memberName,
    message,
    veilId,
    plugInId,
  }: SendEmailNotiType) => {
    try {
      const { from } = this.#config;

      const token = await encodeJWT(
        {
          workspaceId,
          veilId,
          plugInId,
        },
        "7d",
      );

      const templatePath = path.join(
        process.cwd(),
        "src",
        "common",
        "libs",
        "emails",
        "templates",
      );
      const htmlPath = path.join(templatePath, "SendEmailTemplate.html");

      let template = "";
      try {
        template = await fs.readFile(htmlPath, "utf-8");
        template = parseTemplate(template, {
          memberName,
          message: truncateString(message),
          pluginPath: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/plug-in/${plugInId}?botToken=${token}`,
        });
      } catch (error) {
        console.error("Error reading template: ", error);
        template = `
          <div style="background-color:#f1f1f1;margin:0;padding:0">
            <div style="max-width:480px;margin:0 auto;padding:16px 0">
              <div style="color:#222222;font-size:24px;font-weight:600">
                안녕하세요! 챗봇 ${workspaceName}으로부터의 답장입니다.
              </div>
            </div>
          </div>
        `;
      }

      await this.#transporter.sendMail({
        from,
        to,
        subject: `${workspaceName}으로부터의 답장 알림`,
        html: template,
      });
    } catch (error) {
      throw `sendReplyNotification: ${error}`;
    }
  };
}

// mjml에 동적데이터 삽입을 위해 생성
// {{변수명}}으로 mjml에 작성후, 함수의 vars에 {변수명값 : 벨류값..} 으로 전달
const parseTemplate = (template: string, vars: { [key: string]: string }) => {
  return template.replace(/{{\s*([\w]+)\s*}}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
};

const truncateString = (str: string, maxLength: number = 80) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + "...";
};

export const mailService = new EmailService();
