import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/common/components/ui/Dialog";

const DemoCompleteForm = () => {
  return (
    <>
      <DialogHeader className="flex items-center">
        <DialogTitle>
          <p className="flex items-center gap-2 text-lg text-black-normal">
            🎉 데모 신청이 정상적으로 처리되었습니다!
          </p>
        </DialogTitle>
        <DialogDescription className="whitespace-pre-wrap text-center text-md mobile:text-sm">
          {`docenty.ai에 관심을 가져주셔서 진심으로 감사드립니다 😊\n빠른 시일 내에 담당자가 연락을 드릴 예정입니다.\n(데모 날짜와 시간은 상황에 따라 변동될 수 있습니다.)`}
        </DialogDescription>
      </DialogHeader>
    </>
  );
};

export default DemoCompleteForm;
