export type AIBotKnowledgeFileScrapingGenerateUrlsResponse =
  GenerateUrlsResp | null;

export type AIBotKnowledgeResponse = {
  items?: AIBotKnowledgeDTO[] | null;
};

export type AIBotKnowledgeDTO = {
  uid: string;
  name?: string | null;
  itemSelections?: ItemSelectionDocToDto[] | null;
  failedDocItemKeysDict?: Record<string, string[]>;
  vecsData?: VecsData | null;
  acntUid: string;
  wsUid?: string | null;
  title?: string | null;
  metadata?: object | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type ItemSelectionDocToDto = {
  itemuid: string;
  itemkey: string;
  title?: string | null;
  type?: AIBotKnowledgeItemType;
  status?: AIBotKnowledgeItemStatus;
  createdAt?: string | null;
  updatedAt?: string | null;
  modified_pageContent?: string | null;
};

type VecsData = {
  namespace: string;
  vectorCount?: number | null;
  updatedAt?: string | null;
};

export type AIBotKnowledgeItemType =
  | "scraped"
  | "uploaded"
  | "written"
  | "ingested"
  | null;

export type AIBotKnowledgeItemStatus = "USED" | "UNUSED" | "DELETE" | null;

type GenerateUrlsResp = {
  genUrls: Record<string, string>;
  basePath?: string | null;
  acntUid: string;
  wsUid?: string | null;
  taskUid: string;
};
