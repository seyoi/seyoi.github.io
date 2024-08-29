//data/guidesData.ts
export const guidesData: GuideType[] = [
  {
    id: "1",
    title: "챗봇 매뉴얼",
    description: "설치한 챗봇의 사용방법에 대한 매뉴얼입니다.",
    sections: [
      {
        title: "1 챗봇 위젯 확인",
        content:
          "스크립트를 통하여 챗봇을 정상적으로 설치했을 경우, 기본적으로 페이지 우측 하단에 챗봇 위젯이 나타나게 되고, 위젯을 클릭할 시 채팅창 홈이 나타납니다.",
        imageUrl:
          "https://task-agency-bucket-live.s3.ap-northeast-2.amazonaws.com/manuals/954/3810/capture-1718847096186-step-4-position.png",
      },
      {
        title: "2 홈",
        content:
          "홈에서는 설정된 챗봇의 정보를 확인하고 문의기능을 이용할 수 있습니다.",
        imageUrl:
          "https://task-agency-bucket-live.s3.ap-northeast-2.amazonaws.com/manuals/954/3810/스크린샷 2024-06-20 오전 10.41.23-position.png",
      },
      // Add more sections as needed
    ],
  },
  // Add more guides as needed
];

export type SectionType = {
  title: string;
  content: string;
  imageUrl: string;
};

export type GuideType = {
  id: string;
  title: string;
  description: string;
  sections: SectionType[];
};
