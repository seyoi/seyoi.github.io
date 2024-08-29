import { getBot } from "@/domains/ai-chatbot/actions/getBot";
import AIChatbotSidebar from "@/domains/ai-chatbot/components/AIChatbotSidebar";

export default async function AIChatbotLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { botId: string };
}) {
  const { botId } = params;
  const { bot, error } = await getBot({ botId });
  if (error) console.error(error);

  return (
    <div className="grid min-h-0 grid-cols-[250px,minmax(0,1fr)]">
      <AIChatbotSidebar botName={bot?.name} />
      {children}
    </div>
  );
}
