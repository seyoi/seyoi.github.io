export function BusinessPlanTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="text-[3rem] font-[700] text-[#0D0B33]">{title}</h1>
      <p className="text-[1rem] font-[500] text-[#0D0B33]">{subTitle}</p>
    </div>
  );
}
