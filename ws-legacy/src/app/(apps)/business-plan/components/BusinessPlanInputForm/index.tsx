import { DND } from "./DND";
import { Prompt } from "./Prompt";
import type { BusinessPlanType } from "../../types";

export function BusinessPlanInputForm({ type }: { type: BusinessPlanType }) {
  return (
    <div className="flex flex-col gap-[1rem]">
      <Title
        title="과거에 작성한 사업계획서, 제품소개서의 PDF 혹은 HWP 파일을 업로드해주세요."
        subTitle="(사업계획서 항목에 적합한 내용을 업로드하면 결과물의 품질이 좋아집니다. 
          민감한 개인 정보는 제거후 업로드해주세요.)"
      />
      <DND />
      <Title
        title="최신 정보와 보충할 내용을 작성해주세요."
        subTitle="(사업계획서 항목에 적합한 내용을 업로드하면 결과물의 품질이 좋아집니다. 민감한 개인 정보는 적지 말아주세요.)"
      />
      <Prompt type={type} />
    </div>
  );
}

const Title = ({ title, subTitle }: { title: string; subTitle: string }) => (
  <div className="flex flex-col">
    <h3 className="text-[1.5rem] font-[600] text-[#0D0B33]">{title}</h3>
    <p className="text-[1rem] font-[600] text-[#FA5252]">{subTitle}</p>
  </div>
);
