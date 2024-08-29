export type FAQGenerateUrlsPostResponse = GenerateUrlsResp | null;

export interface FAQResponse {
  create_response?: QaCreateResponse;
  get_response?: QaGetResponse;
  update_response?: QaUpdateResponse;
  delete_response?: QaDeleteResponse;
}

export interface QaCreateResponse {
  qa_node: QaNode;
}

export interface QaGetResponse {
  qa_nodes?: QaNode[];
}

export interface QaUpdateResponse {
  qa_nodes?: QaNode[];
}

export interface QaDeleteResponse {
  request_success?: boolean;
}

export interface StoreFilesReq {
  reqData: FileLoadingReqData;
  taskBaseName?: string | null;
  acntUid: string;
  wsUid?: string | null;
  taskUid?: string | null;
  loadingName?: DocLoadingName;
  forceUpdateDb?: boolean;
  includeResult?: boolean | null;
}

export interface FileLoadingReqData {
  ingestionType?: IngestionType;
  basePath?: string | null;
  fileNames?: FileReqList[] | null;
}

export type DocLoadingName = "scraped" | "uploaded" | "written" | "ingested";

export interface FileLoadingReqData {
  ingestionType?: IngestionType;
  basePath?: string | null;
  fileNames?: FileReqList[] | null;
}

export type IngestionType =
  | "SCRAPE_Web_Plain"
  | "UPLOAD_File_Plain"
  | "FILE_Pdf_Plain"
  | "FILE_Csv_Structured"
  | "MDB_Csv_Plain"
  | "MDB_Qna_Qna"
  | "MDB_Text_Plain"
  | "UPLOAD_Image_Plain";

export interface FileReqList {
  fileName: string;
  fileType?: string;
}

export interface QaCreateParameter {
  qa_node: QaNode;
  parent_uids?: string[];
}

export interface QaNode {
  _id?: string;
  title?: string;
  qa_uid: string;
  account_uid: string;
  workspace_uid: string;
  bot_class_uids?: string[];
  question: string;
  contents?: Content[];
  parent_uids?: string[];
  is_root?: boolean;
  children?: QaNode[];
  created_at?: string;
  updated_at?: string;
  is_activated?: boolean;
}

export interface Content {
  content_id: string;
  question?: string;
  answer: string;
  keywords?: string[];
  images_path?: string[];
  button?: object;
  form?: object;
}

export interface QaUpdateParameter {
  qa_node_uid: string;
  question?: string;
  contents?: Content[];
  children?: QaNode[];
  delete_bot_class_uids?: string[];
  add_bot_class_uids?: string[];
}

export interface QaDeleteParameter {
  qa_node_uid: string;
}

export interface GenerateUrlsResp {
  genUrls: Record<string, string>;
  basePath?: string | null;
  acntUid: string;
  wsUid?: string | null;
  taskUid: string;
}
