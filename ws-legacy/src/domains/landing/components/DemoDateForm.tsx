import { Calendar } from "@/common/components/ui/Calendar";
import {
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/Dialog";
import { X } from "lucide-react";

type DemoDateFormProps = {
  date: Date | null;
  setDate: (date: Date) => void;
};

const DemoDateForm = ({ date, setDate }: DemoDateFormProps) => {
  const today = new Date();

  return (
    <>
      <DialogHeader className="flex items-center">
        <DialogClose
          onClick={() => {}}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
        </DialogClose>
        <DialogTitle>
          <p className="flex items-center gap-2 text-xl text-black-normal mobile:text-lg">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.15383 12L0 6.00009L2.46153 3.60012L6.15383 7.20007L13.5385 0L16 2.39997L6.15383 12Z"
                fill="#416BFF"
              />
            </svg>
            데모를 위한 일정 선택
          </p>
        </DialogTitle>
      </DialogHeader>
      <Calendar
        mode="single"
        selected={date!}
        onSelect={(date: Date) => {
          setDate(date);
        }}
        required
        disabled={{ before: today }} // 현재 날짜 이전 선택 비활성화
        className="rounded-md border"
      />
    </>
  );
};

export default DemoDateForm;
