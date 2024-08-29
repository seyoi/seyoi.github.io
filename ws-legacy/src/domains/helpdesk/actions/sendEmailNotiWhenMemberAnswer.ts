"use server";

import { mailService } from "@/common/libs/emails/EmailService";
import { SendEmailNotiType } from "@/domains/helpdesk/types/helpdesk.type";

export const sendEmailNotiWhenMemberAnswer = async ({
  workspaceName,
  workspaceId,
  to,
  memberName,
  message,
  veilId,
  plugInId,
}: SendEmailNotiType) => {
  try {
    await mailService.sendEmailNotification({
      workspaceName,
      workspaceId,
      to,
      memberName,
      message,
      veilId,
      plugInId,
    });
    return { error: null };
  } catch (error) {
    return { error: `${error}` };
  }
};
