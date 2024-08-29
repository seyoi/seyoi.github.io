export const initialChochangpaeForm: {
  [key in
    | "문제인식(Problem)"
    | "실현가능성(Solution)"
    | "성장전략(Scale-Up)"
    | "팀구성(Team)"]: {
    question:
      | "창업 아이템 배경 및 필요성"
      | "목표시장(고객) 및 요구사항 분석"
      | "창업 아이템 현황(준비정도)"
      | "창업 아이템 실현 및 구체화 방안"
      | "비즈니스 모델 및 추진 성과"
      | "시장진입 등 사업화 전략"
      | "사업 추진일정 및 자금운용 계획"
      | "기업구성 및 보유역량"
      | "중장기 ESG 경영 도입계획";
    answer: string;
    status: "INIT" | "LOADING" | "SUCCEEDED";
  }[];
} = {
  "문제인식(Problem)": [
    {
      question: "창업 아이템 배경 및 필요성",
      answer: "",
      status: "INIT",
    },
    {
      question: "목표시장(고객) 및 요구사항 분석",
      answer: "",
      status: "INIT",
    },
  ],
  "실현가능성(Solution)": [
    {
      question: "창업 아이템 현황(준비정도)",
      answer: "",
      status: "INIT",
    },
    {
      question: "창업 아이템 실현 및 구체화 방안",
      answer: "",
      status: "INIT",
    },
  ],
  "성장전략(Scale-Up)": [
    {
      question: "비즈니스 모델 및 추진 성과",
      answer: "",
      status: "INIT",
    },
    {
      question: "시장진입 등 사업화 전략",
      answer: "",
      status: "INIT",
    },
    {
      question: "사업 추진일정 및 자금운용 계획",
      answer: "",
      status: "INIT",
    },
  ],
  "팀구성(Team)": [
    {
      question: "기업구성 및 보유역량",
      answer: "",
      status: "INIT",
    },
    {
      question: "중장기 ESG 경영 도입계획",
      answer: "",
      status: "INIT",
    },
  ],
};

export const initialYechangpaeForm: {
  [key in
    | "문제인식(Problem)"
    | "실현가능성(Solution)"
    | "성장전략(Scale-Up)"
    | "팀구성(Team)"]: {
    question:
      | "창업 아이템 배경 및 필요성"
      | "목표시장(고객) 현황 분석"
      | "창업아이템 현황(준비정도)"
      | "창업 아이템 실현 및 구체화 방안"
      | "창업아이템 사업화 추진전략"
      | "생존율 제고를 위한 노력"
      | "사업추진일정 및 자금운용 계획"
      | "대표자(팀) 현황 및 보유역량"
      | "외부 협력 현황 및 활용 계획"
      | "중장기 사회적 가치 도입계획";
    answer: string;
    status: "INIT" | "LOADING" | "SUCCEEDED";
  }[];
} = {
  "문제인식(Problem)": [
    {
      question: "창업 아이템 배경 및 필요성",
      answer: "",
      status: "INIT",
    },
    {
      question: "목표시장(고객) 현황 분석",
      answer: "",
      status: "INIT",
    },
  ],
  "실현가능성(Solution)": [
    {
      question: "창업아이템 현황(준비정도)",
      answer: "",
      status: "INIT",
    },
    {
      question: "창업 아이템 실현 및 구체화 방안",
      answer: "",
      status: "INIT",
    },
  ],
  "성장전략(Scale-Up)": [
    {
      question: "창업아이템 사업화 추진전략",
      answer: "",
      status: "INIT",
    },
    {
      question: "생존율 제고를 위한 노력",
      answer: "",
      status: "INIT",
    },
    {
      question: "사업추진일정 및 자금운용 계획",
      answer: "",
      status: "INIT",
    },
  ],
  "팀구성(Team)": [
    {
      question: "대표자(팀) 현황 및 보유역량",
      answer: "",
      status: "INIT",
    },
    {
      question: "외부 협력 현황 및 활용 계획",
      answer: "",
      status: "INIT",
    },
    {
      question: "중장기 사회적 가치 도입계획",
      answer: "",
      status: "INIT",
    },
  ],
};
