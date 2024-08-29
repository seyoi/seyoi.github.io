import { demoUserType } from "../types/types";

export const sendDemoformNotiToSlack = ({
  purpose,
  name,
  email,
  demoDate,
  createdAt,
  companySize,
}: demoUserType) => {
  const SLACK_WEBHOOK_KEY =
    process.env.NEXT_PUBLIC_SLACK_DEMOFORM_WEBHOOK_API_KEY;
  const payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${name}고객님이 데모를 신청하셨습니다!\n`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*이메일:*\n${email}`,
          },
          {
            type: "mrkdwn",
            text: `*희망 날짜:*\n${demoDate}`,
          },
          {
            type: "mrkdwn",
            text: `*신청 날짜:*\n${createdAt}`,
          },
          {
            type: "mrkdwn",
            text: `*제품 사용 목적:*\n${purpose}.`,
          },
          {
            type: "mrkdwn",
            text: `*회사 규모:*\n${companySize}`,
          },
        ],
      },
    ],
  };

  fetch(SLACK_WEBHOOK_KEY as string, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
