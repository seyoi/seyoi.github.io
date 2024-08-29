import { PrismaClient } from "@prisma/client";

// botClsUid => botId
async function main() {
  const prisma = new PrismaClient();

  await prisma.workspacePlot.update({
    where: { id: "clxieq6xa00035j3yy895bod3" },
    data: {
      steps: JSON.stringify([
        {
          id: "1",
          type: "start",
          name: "위드인천에너지 챗봇 시나리오 시작",
          messages: [
            {
              message: {
                text: {
                  type: "text",
                  value:
                    "안녕하세요! 위드인천에너지입니다.\n\n지역난방에 관심을 가져주셔서 감사드립니다.\n\n아래 버튼 중 고객님께서 해당되는 항목을 선택해 주세요.",
                },
              },
            },
          ],
          nextButtons: [
            { text: "관리사무소", nextStepId: "2" },
            { text: "입주민", nextStepId: "3" },
            { text: "기타", nextStepId: "4" },
          ],
        },
        {
          id: "2",
          type: "end",
          name: "관리사무소 선택",
          messages: [
            {
              message: {
                text: {
                  type: "text",
                  value:
                    "관리사무소를 선택하셨습니다.\n\n요금 및 바우처 조회를 원하시면 아래 요금 및 바우처 조회 버튼을 클릭해주세요(클릭시 해당 홈페이지가 열립니다.)\n\n(요금 조회는 PC버전만 제공합니다.)\n\n감사합니다.",
                },
                button: {
                  type: "link",
                  label: "요금 및 바우처 조회",
                  url: "https://www.withie.co.kr/Front/Customer/Login",
                },
              },
            },
          ],
        },
        {
          id: "3",
          type: "end",
          name: "입주민 선택",
          messages: [
            {
              message: {
                text: {
                  type: "text",
                  value:
                    "입주민을 선택하셨습니다.\n\n세대에서 사용된 요금 문의 혹은 세대 내 난방공급 문제 발생시 관리사무소에 문의해주세요.\n\n감사합니다.",
                },
              },
            },
          ],
        },
        {
          id: "4",
          type: "end",
          name: "기타",
          messages: [
            {
              message: {
                text: {
                  type: "text",
                  value:
                    "위드인천에너지에 대해 궁금하신 점을 물어보시면 답변해드겠습니다.\n\n감사합니다.",
                },
              },
            },
          ],
        },
      ]),
    },
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => {
    const PrismaClient = Prisma.PrismaClient;
    const prisma = new PrismaClient();
    prisma.$disconnect;
  });
