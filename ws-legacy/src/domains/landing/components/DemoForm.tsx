"use client";
import { Button } from "@/common/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/common/components/ui/Dialog";
import { useDemoForm } from "../hooks/useDemoForm";
import DemoDateForm from "./DemoDateForm";
import DemoDetailForm from "./DemoDetailForm";
import DemoCompleteForm from "./DemoCompleteForm";

export function DemoForm({
  variant,
  disabled,
  business,
  direct,
  title,
  onSuccess,
}: DemoFormType) {
  const {
    date,
    setDate,
    currentStep,
    purpose,
    setPurpose,
    email,
    handleEmail,
    name,
    setName,
    companySize,
    setCompanySize,
    isFormEmpty,
    handleSubmit,
    handlePrevStep,
    handleNextStep,
    handleCloseForm,
  } = useDemoForm(direct, onSuccess);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <DemoDateForm date={date} setDate={setDate} />;
      case 2:
        return (
          <DemoDetailForm
            purpose={purpose}
            setPurpose={setPurpose}
            email={email}
            handleEmail={handleEmail}
            name={name}
            setName={setName}
            companySize={companySize}
            setCompanySize={setCompanySize}
            isFormEmpty={isFormEmpty}
            handlePrevStep={handlePrevStep}
            handleSubmit={handleSubmit}
          />
        );
      case 3:
        return <DemoCompleteForm />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={disabled}
          className={`group relative flex w-fit items-center justify-center gap-1 rounded-xl disabled:cursor-not-allowed ${
            variant === "blue"
              ? "bg-gradient-to-r from-[#416BFF] to-[#3658D1] px-3 py-4 transition-all duration-300 ease-out hover:from-[#416BFF] hover:to-[#89A3FF]"
              : "bg-white px-6 py-4 hover:bg-blue-light"
          } ${business ? "mobile:w-fit mobile:py-3" : "mobile:h-[47px] mobile:w-full"} ${title ? "w-full" : "w-fit"}`}
        >
          <div
            className={`text-lg mobile:text-boldmd ${variant === "blue" ? "text-white-normal" : "text-[#416BFF]"}`}
          >
            {variant === "blue" ? (
              <div className="flex items-center gap-1">
                <p> {title ? title : "상담&시연신청"}</p>
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  <path
                    d="M1 5H13M13 5L9.57143 8.42857M13 5L9.57143 1.57143"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <p> 데모 신청 시작</p>
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.99986H13M13 4.99986L9.57143 8.42843M13 4.99986L9.57143 1.57129"
                    stroke="#416BFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="z-[10000] bg-white p-16">
        {renderStepContent()}
        <DialogFooter className="flex justify-between mobile:mr-0 mobile:flex-col mobile:items-end">
          {currentStep === 1 && (
            <Button
              className="w-fit cursor-pointer rounded-lg bg-[#416BFF] px-5 py-2 text-white-normal"
              variant="outline"
              size="icon"
              disabled={!date}
              onClick={handleNextStep}
            >
              다음
            </Button>
          )}
          {currentStep === 2 && (
            <div className="flex items-center gap-2">
              <Button
                className="flex items-center gap-1 rounded-lg text-sm text-gray-normal hover:bg-gray-lightest"
                onClick={handlePrevStep}
              >
                이전으로
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4997 4.5V8.5C12.4997 9.03043 12.289 9.53914 11.9139 9.91421C11.5388 10.2893 11.0301 10.5 10.4997 10.5H3.83301M3.83301 10.5L6.49967 7.83333M3.83301 10.5L6.49967 13.1667"
                    stroke="#5C5C5C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button
                className="flex items-center gap-1 bg-[#416BFF] text-white"
                type="button"
                onClick={handleSubmit}
              >
                제출하기
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33301 8.50033L6.66634 11.8337L13.333 5.16699"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          )}
          {currentStep === 3 && (
            <DialogClose asChild>
              <button
                className="rounded-md bg-red-normal px-4 py-2 text-md text-white-normal"
                onClick={handleCloseForm}
              >
                닫기
              </button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type DemoFormType = {
  variant: string;
  business?: boolean;
  disabled?: boolean;
  direct?: string;
  title?: string;
  onSuccess?: () => void;
};
