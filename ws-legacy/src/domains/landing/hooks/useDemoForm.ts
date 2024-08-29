import { useState, useEffect, ChangeEvent } from "react";
import { postDemoForm } from "../actions/postDemoForm";
import { sendDemoformNotiToSlack } from "../actions/sendDemoformNotiToSlack";

export function useDemoForm(direct?: string, onSuccess?: () => void) {
  const [date, setDate] = useState<Date | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>("");
  const [email, setEmail] = useState<string>(direct || "");
  const [name, setName] = useState<string>("");
  const [companySize, setCompanySize] = useState<string>("");
  const [isFormEmpty, setIsFormEmpty] = useState(false);

  useEffect(() => {
    if (direct) {
      setEmail(direct);
    }
  }, [direct]);

  const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!direct) {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!purpose || !email || !name || !companySize) {
      setIsFormEmpty(true);
      return;
    }

    const utcNow = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        new Date().getUTCSeconds(),
        new Date().getUTCMilliseconds(),
      ),
    );

    const demoDate = new Date(date!.getTime() + 9 * 60 * 60 * 1000);

    try {
      await postDemoForm({
        purpose,
        email,
        name,
        createdAt: utcNow,
        demoDate,
        companySize,
      });
      await sendDemoformNotiToSlack({
        purpose,
        name,
        email,
        demoDate,
        createdAt: utcNow,
        companySize,
      });
      resetForm();
      setCurrentStep(3);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("post demo form error:", err);
    }
  };

  const handleCloseForm = () => {
    resetForm();
    setCurrentStep(1);
  };

  const resetForm = () => {
    setPurpose("");
    setEmail(direct || "");
    setName("");
    setCompanySize("");
    setDate(null);
  };

  return {
    date,
    setDate,
    currentStep,
    setCurrentStep,
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
  };
}
