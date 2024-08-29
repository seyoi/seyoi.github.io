import { useMemo, useState } from "react";

import type {
  BusinessPlanType,
  BusinessPlanPrompt,
  BusinessPlanFile,
} from "./types";
import {
  addToBusinessPlanAutoWriteHistory,
  addToBusinessPlanHistory,
} from "./actions";

export function useBusinessPlan({ type }: { type: BusinessPlanType }) {
  const initialBusinessPlanPrompt = useMemo(
    () => initBusinessPlanPrompt(type),
    [type],
  );
  const initialBusinessPlanForm = useMemo(
    () => initBusinessPlanForm(type),
    [type],
  );
  const [prompt, setPrompt] = useState<BusinessPlanPrompt>(
    initialBusinessPlanPrompt,
  );
  const [files, setFiles] = useState<BusinessPlanFile[]>([]);
  const [taskName, setTaskName] = useState("");
  const [businessPlanForm, setBusinessPlanForm] = useState(
    initialBusinessPlanForm,
  );
  const [businessPlanHistoryId, setBusinessPlanHistoryId] = useState("");

  const executeScrapingBusinessPlan = async ({
    prompt,
    files,
    userId,
  }: {
    prompt: BusinessPlanPrompt;
    files: BusinessPlanFile[];
    userId: string;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type: typeFromPromptNoUse, ...restPrompt } = prompt;
    const body = JSON.stringify({
      type,
      prompt: restPrompt,
      files: files.map(({ filePath, type }: BusinessPlanFile) => ({
        file_paths: filePath,
        type,
      })),
    });
    const { task_name: taskName }: { task_name: string } = await (
      await fetch("/api/business-plan/scraping", {
        method: "POST",
        cache: "no-store",
        body,
      })
    ).json();

    const businessPlanHistory = await addToBusinessPlanHistory({
      type,
      filePaths: JSON.stringify(
        files.map(({ filePath, type }: BusinessPlanFile) => ({
          file_paths: filePath,
          type,
        })),
      ),
      prompt: JSON.stringify(restPrompt),
      userId,
    });

    return { taskName, businessPlanHistoryId: businessPlanHistory.id };
  };

  const setAllBusinessPlanFormItemsLoading = () =>
    setBusinessPlanForm((prev) =>
      prev.map((item) => ({ ...item, status: "LOADING" })),
    );

  const writeAllBusinessPlanFormItem = async ({
    taskName,
    businessPlanHistoryId,
  }: {
    taskName: string;
    businessPlanHistoryId: string;
  }) => {
    const promises: Promise<void>[] = [];

    for (const item of businessPlanForm) {
      const type = item.type;
      const smallTitle = item.smallTitle;

      const promise = fetch("/api/business-plan/auto-write", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          type,
          taskName,
          message: smallTitle,
        }),
      })
        .then((res) => res.json())
        .then(({ answer }) => {
          setBusinessPlanForm((prev) =>
            prev.map((item) =>
              item.smallTitle === smallTitle
                ? { ...item, answer, status: "SUCCEEDED" }
                : item,
            ),
          );
          addToBusinessPlanAutoWriteHistory({
            type,
            question: smallTitle,
            answer,
            businessPlanHistoryId,
          });
        });

      promises.push(promise);
    }

    await Promise.all(promises);
  };

  const writeBusinessPlanFormItem = ({
    taskName,
    smallTitle,
    businessPlanHistoryId,
  }: {
    taskName: string;
    smallTitle: string;
    businessPlanHistoryId: string;
  }) => {
    setBusinessPlanForm((prev) =>
      prev.map((item) =>
        item.smallTitle === smallTitle ? { ...item, status: "LOADING" } : item,
      ),
    );

    fetch("/api/business-plan/auto-write", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        type,
        taskName,
        message: smallTitle,
      }),
    })
      .then((res) => res.json())
      .then(({ answer }: { answer: string }) => {
        setBusinessPlanForm((prev) =>
          prev.map((item) =>
            item.smallTitle === smallTitle
              ? { ...item, answer, status: "SUCCEEDED" }
              : item,
          ),
        );
        addToBusinessPlanAutoWriteHistory({
          type,
          question: smallTitle,
          answer,
          businessPlanHistoryId,
        });
      });
  };

  return {
    prompt,
    files,
    taskName,
    businessPlanForm,
    businessPlanHistoryId,
    setPrompt,
    setFiles,
    setTaskName,
    setBusinessPlanHistoryId,
    executeScrapingBusinessPlan,
    setAllBusinessPlanFormItemsLoading,
    writeAllBusinessPlanFormItem,
    writeBusinessPlanFormItem,
  };
}

const initBusinessPlanPrompt = (type: BusinessPlanType) => {
  if (type === "chochangpae")
    return {
      type,
      chochangpae_a82443c5_794e_43e3_8dff_9a01d942e49c_item_name: "",
      chochangpae_72857563_4ccf_4add_bf69_681a14a6bcfb_item_desc: "",
      chochangpae_27a3b793_2954_493a_bd64_f753edbfa699_item_progress: "",
      chochangpae_520e6859_78e7_4ee4_aefb_21fb6d5cd324_item_bm: "",
      chochangpae_0021ccb0_7de9_4e89_a384_5053b58864df_item_plan: "",
    };

  return {
    type,
    yechangpae_ee19b046_d62f_439c_8b47_2ab6ca1e1e42_item_name: "",
    yechangpae_2271ffb1_780c_46b6_a8a7_641147aa461a_item_desc: "",
    yechangpae_3b10bd5a_7ef2_438f_8dad_b08e04aa9eba_item_progress: "",
    yechangpae_d461c789_32bf_4fae_ad6c_e033c6798bea_item_bm: "",
    yechangpae_b8f1f68e_4a7d_4e72_b421_4cf25db4a3a9_item_plan: "",
  };
};

const initBusinessPlanForm = (type: BusinessPlanType) => {
  if (type === "chochangpae") return initialChochangpaeForm;

  return initialYechangpaeForm;
};

const initialChochangpaeForm: BusinessPlanFormItem[] = [
  {
    type: "chochangpae",
    bigTitle: "문제인식(Ploblem)",
    smallTitle: "창업아이템 배경 및 필요성",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "문제인식(Ploblem)",
    smallTitle: "창업아이템 목표시장(고객) 현황 분석",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "실현가능성(Solution)",
    smallTitle: "창업아이템 현황 (준비 정도)",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "실현가능성(Solution)",
    smallTitle: "창업아이템의 실현 및 구체화 방안",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "성장전략(Scale-Up)",
    smallTitle: "창업아이템의 비즈니스 모델 및 사업화 추진성과",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "성장전략(Scale-Up)",
    smallTitle: "창업아이템 사업화 추진 전략",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "성장전략(Scale-Up)",
    smallTitle: "사업추진 일정 및 자금 운용 계획",
    answer: "",
    status: "INIT",
  },
  {
    type: "chochangpae",
    bigTitle: "팀구성(Team)",
    smallTitle: "중장기 ESG 경영 도입 계획",
    answer: "",
    status: "INIT",
  },
];

const initialYechangpaeForm: BusinessPlanFormItem[] = [
  {
    type: "yechangpae",
    bigTitle: "문제인식(Ploblem)",
    smallTitle: "창업아이템 배경 및 필요성",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "문제인식(Ploblem)",
    smallTitle: "창업아이템 목표시장(고객) 현황 분석",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "실현가능성(Solution)",
    smallTitle: "창업아이템의 현황(준비정도)",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "실현가능성(Solution)",
    smallTitle: "창업 아이템 실현 및 구체화 방안",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "실현가능성(Solution)",
    smallTitle: "창업아이템 비즈니스 모델",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "성장전략(Scale-Up)",
    smallTitle: "창업아이템 사업화 추진전략",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "성장전략(Scale-Up)",
    smallTitle: "사업추진 일정 및 자금운용 계획",
    answer: "",
    status: "INIT",
  },
  {
    type: "yechangpae",
    bigTitle: "팀구성(Team)",
    smallTitle: "중장기 사회적 가치 도입계획",
    answer: "",
    status: "INIT",
  },
];

type BusinessPlanFormItem = {
  bigTitle:
    | "문제인식(Ploblem)"
    | "실현가능성(Solution)"
    | "성장전략(Scale-Up)"
    | "팀구성(Team)";
  answer: string;
  status: "INIT" | "LOADING" | "SUCCEEDED";
} & (
  | {
      type: "chochangpae";
      smallTitle: ChochangpaeFormSmallTitle;
    }
  | {
      type: "yechangpae";
      smallTitle: YechangpaeFormSmallTitle;
    }
);

type ChochangpaeFormSmallTitle =
  | "창업아이템 배경 및 필요성"
  | "창업아이템 목표시장(고객) 현황 분석"
  | "창업아이템 현황 (준비 정도)"
  | "창업아이템의 실현 및 구체화 방안"
  | "창업아이템의 비즈니스 모델 및 사업화 추진성과"
  | "창업아이템 사업화 추진 전략"
  | "사업추진 일정 및 자금 운용 계획"
  | "중장기 ESG 경영 도입 계획";

type YechangpaeFormSmallTitle =
  | "창업아이템 배경 및 필요성"
  | "창업아이템 목표시장(고객) 현황 분석"
  | "창업아이템의 현황(준비정도)"
  | "창업 아이템 실현 및 구체화 방안"
  | "창업아이템 비즈니스 모델"
  | "창업아이템 사업화 추진전략"
  | "사업추진 일정 및 자금운용 계획"
  | "중장기 사회적 가치 도입계획";
