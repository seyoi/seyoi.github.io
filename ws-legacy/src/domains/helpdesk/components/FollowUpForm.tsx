export function FollowUpForm({
  email,
  submittedAt,
}: {
  email: string;
  submittedAt: Date | null;
}) {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] border border-mint-light bg-white-normal p-[20px]">
      <div className="flex flex-col gap-[8px]">
        <div className="self-start text-boldmd">이메일</div>
        {submittedAt && <div className="text-sm text-gray-normal">{email}</div>}
        {!submittedAt && (
          <div className="w-full rounded-[8px] border-[1.5px] border-gray-lightest p-[8px] text-md text-gray-light outline-[3px] outline-offset-[2px] outline-transparent">
            아직 유저가 이메일을 입력하지 않았어요
          </div>
        )}
      </div>
    </div>
  );
}
