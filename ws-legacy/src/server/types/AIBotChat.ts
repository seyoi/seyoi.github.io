export interface AIBotChatResponse {
  datasource?: ChatDatasource | null;
  messageUid?: string | null;
  messageGenUuid?: string | null;
  botMessage: Message;
  answer: string;
  etc?: object | null;
  modelName: string;
  openAi?: LangchainOpenai | null;
}

export interface ChatDatasource {
  chatSources: ChatSource[];
}

export interface ChatSource {
  url?: string | null;
  title?: string | null;
  fileName?: string | null;
  itemKey?: string | null;
  itemUid?: string | null;
  pageNum?: number | null;
  score?: number | null;
  similarity?: boolean | null;
  pageContent?: string | null;
  images_path?: string[] | null;
  description?: string | null;
}

export interface Message {
  content: string;
  additional_kwargs?: object;
  response_metadata?: object;
  type?: string | null;
  name?: string;
  id?: string;
  speakerRole?: SpeakerRole | null;
  prompt?: string | null;
  params?: object | null;
  sentUuid?: string | null;
  originSentUuid?: string | null;
  uid?: string | null;
  action?: string | null;
  actionParams?: object | null;
  origin?: Message | null;
}

export type LangchainOpenai = "chat_openai" | "azure_openai" | "ollama";

export type SpeakerRole = "BOT" | "USER" | "AGENT";
