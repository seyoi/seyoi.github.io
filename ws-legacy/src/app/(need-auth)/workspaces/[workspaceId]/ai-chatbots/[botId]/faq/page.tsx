import { getFaq } from "@/domains/ai-chatbot/actions/getFaq";
import FAQActions from "@/domains/ai-chatbot/components/FAQActions";
import FAQList from "@/domains/ai-chatbot/components/FAQList";

export default async function FAQPage({
  params,
}: {
  params: { botId: string };
}) {
  const { botId } = params;

  const { nodes, rootNodeIds } = await getFaq({ bot_class_uid: botId });

  return (
    <div className="grid min-h-0 grid-rows-[135px,minmax(0,1fr)]">
      <FAQActions rootNodeIds={rootNodeIds} />
      <FAQList nodes={nodes} />
    </div>
  );
}
