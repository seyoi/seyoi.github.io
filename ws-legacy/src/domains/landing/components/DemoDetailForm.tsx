import { Input } from "@/common/components/ui/Input";
import { Label } from "@/common/components/ui/Label";
import { DialogHeader, DialogTitle } from "@/common/components/ui/Dialog";
import { format } from "date-fns";

type DemoDetailFormProps = {
  purpose: string;
  setPurpose: (value: string) => void;
  email: string;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  setName: (value: string) => void;
  companySize: string;
  setCompanySize: (value: string) => void;
  isFormEmpty: boolean;
  handlePrevStep: () => void;
  handleSubmit: () => void;
};

const DemoDetailForm = ({
  purpose,
  setPurpose,
  email,
  handleEmail,
  name,
  setName,
  companySize,
  setCompanySize,
  isFormEmpty,
}: DemoDetailFormProps) => {
  return (
    <>
      <DialogHeader className="flex items-center">
        <DialogTitle className="flex items-center gap-2 text-lg text-black-normal mobile:text-lg">
          데모를 위한 몇가지 정보를 입력해주세요!
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-1 text-md text-black-normal mobile:ml-0">
        데모 희망 날짜
        <div className="flex w-fit items-center justify-center rounded-md border p-2 text-md text-gray-normal">
          {format(new Date(), "yyyy년MM월dd일")}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <p className="flex gap-1 text-md text-black-normal">
            제품 사용 목적<span className="text-red-normal">*</span>
          </p>
          <Input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 text-md text-black-normal">
          <Label htmlFor="email">
            <p className="flex gap-1 text-md text-black-normal">
              이메일<span className="text-red-normal">*</span>
            </p>
          </Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 text-md text-black-normal">
          <Label htmlFor="name">
            <p className="flex gap-1 text-md text-black-normal">
              이름<span className="text-red-normal">*</span>
            </p>
          </Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 text-md text-black-normal">
          <p className="flex gap-1 text-md text-black-normal">
            회사 인원수(규모)<span className="text-red-normal">*</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-md text-black-normal">
            {["1-5", "6-10", "11-49", "50-199", "200-999", "1000+"].map(
              (size) => (
                <button
                  key={size}
                  name="size"
                  className={`rounded-lg border border-gray-lighter py-2 ${
                    companySize === size
                      ? "bg-[#416BFF] text-white-normal"
                      : "hover:bg-[#416BFF] hover:text-white-normal focus:bg-[#416BFF] focus:text-white-normal"
                  }`}
                  onClick={() => setCompanySize(size)}
                >
                  {size}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
      {isFormEmpty && (
        <div className="flex items-center gap-2">
          <div className="whitespace-pre-wrap text-md text-red-normal">
            {`필수 항목을 입력했는지 확인해주세요.`}
          </div>
        </div>
      )}
    </>
  );
};

export default DemoDetailForm;
