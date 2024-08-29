import Image from "next/image";
import Link from "next/link";
import { GuideType } from "../data/guidesData";

export function GuidesList({ guides }: { guides: GuideType[] }) {
  return (
    <div className="flex w-full flex-col items-center p-10">
      {guides.map((guide) => (
        <Link
          key={guide.id}
          className="flex w-[1200px] items-center justify-start gap-10 rounded-xl p-10 transition-all duration-300 hover:bg-gray-100"
          href={`/guides/${guide.id}`}
        >
          <Image
            className="rounded-3xl border"
            src={guide.sections[0].imageUrl}
            alt={guide.title}
            width={472}
            height={248}
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">{guide.title}</h2>
            <p>{guide.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
