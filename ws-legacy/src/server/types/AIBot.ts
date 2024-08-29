export type AIBotResponse = {
  cloneBotClsUid?: string | null;
  items?: AIBotDTO[] | null;
  instantiate?: boolean | null;
};

export type AIBotDTO = {
  uid: string;
  acntUid: string;
  wsUid?: string | null;
  trialEmail?: string | null;
  creatorFireAuthUid?: string | null;
  showSources?: boolean;
  title?: string | null;
  displayName?: string | null;
  extraFrontInfo?: object | null;
  namedKnowledgeIndexes2s?: NamedValuesKnowledgeIndexStruct[] | null;
  namedVecsDatas?: NamedValueVecsData[] | null;
  namedPrompts?: NamedValueStr[] | null;
  status?: AIBotStatus;
  createdAt?: string | null;
  updatedAt?: string | null;
  draft?: boolean | null;
  published?: boolean | null;
  instUids?: string[] | null;
  activeInstUid?: string | null;
  modelName?: ModelName | null;
  botUrl?: string | null;
};

type NamedValuesKnowledgeIndexStruct = {
  /** Name */
  name: string;
  values: KnowledgeIndexStruct;
};

type KnowledgeIndexStruct = {
  acntUid: string;
  wsUid: string;
  name?: string | null;
  uid: string;
};

type NamedValueVecsData = {
  name: string;
  value?: VecsData;
};

type VecsData = {
  namespace: string;
  vectorCount?: number | null;
  updatedAt?: string | null;
};

type NamedValueStr = {
  name: string;
  value?: string;
};

type AIBotStatus =
  | "STABLE_ANY"
  | "UNSTABLE_UPDATING"
  | "DOWN_CREATING"
  | "DOWN_UPDATING"
  | "DOWN_FAILED"
  | "DOWN_DELETED"
  | "TASK_SUCCEEDED"
  | "TASK_FAILED"
  | "DOCS_SUCCEEDED"
  | "DOCS_FAILED"
  | "KNLG_SUCCEEDED"
  | "KNLG_FAILED"
  | "BOTCLS_SUCCEEDED"
  | "BOTCLS_FAILED"
  | null;

export type ModelName =
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-1106"
  | "gpt-3.5-turbo-0125"
  | "gpt-4"
  | "gpt-4-1106-preview"
  | "gpt-4-turbo"
  | "gpt-4o"
  | "upstage/solar-1-mini-chat-ko"
  | "llama3"
  | "llama3:70b";
