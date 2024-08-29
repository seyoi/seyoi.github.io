/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AccountCreateReq */
export interface AccountCreateReq {
  /**
   * Basename
   * @example "docenty"
   */
  baseName: string;
  /**
   * Email
   * @example "dcty.swe.dev.shared@docenty.ai"
   */
  email?: string | null;
  /**
   * Fireauthuid
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  fireAuthUid?: string | null;
}

/** AccountDto */
export interface AccountDto {
  /**
   * Uid
   * @example "docenty-abcdefgh"
   */
  uid: string;
  /**
   * Lid
   * @default ""
   * @example "abcdefgh"
   */
  lid?: string | null;
  /**
   * Fireauthuid
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  fireAuthUid?: string | null;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /**
   * Basename
   * @example "docenty"
   */
  baseName?: string | null;
  /**
   * Email
   * @example "dcty.swe.dev.shared@docenty.ai"
   */
  email?: string | null;
  /**
   * Createdat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  createdAt?: string | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
  /**
   * Deletedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  deletedAt?: string | null;
}

/** AccountResp */
export interface AccountResp {
  /** Item */
  item?: AccountDto | null;
}

/** AccountUpdateReq */
export interface AccountUpdateReq {
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /**
   * Email
   * @example "dcty.swe.dev.shared@docenty.ai"
   */
  email?: string | null;
  /**
   * Fireauthid
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  fireAuthId?: string | null;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
}

/** Body_create_qa_nodes_api_v1_faq_nodes_post */
export interface BodyCreateQaNodesApiV1FaqNodesPost {
  web_request?: QaRequest;
  file_request?: StoreFilesReq;
}

/** BotClsDto */
export interface BotClsDto {
  /** Uid */
  uid: string;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Trialemail
   * @example "dcty.swe.dev.shared@docenty.ai"
   */
  trialEmail?: string | null;
  /**
   * Creatorfireauthuid
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  creatorFireAuthUid?: string | null;
  /**
   * Showsources
   * @default true
   * @example true
   */
  showSources?: boolean;
  /**
   * Title
   * @example "Docenty Bot"
   */
  title?: string | null;
  /**
   * Displayname
   * @example "Docenty Bot"
   */
  displayName?: string | null;
  /** Extrafrontinfo */
  extraFrontInfo?: object | null;
  /** Namedknowledgeindexes2S */
  namedKnowledgeIndexes2s?: NamedValuesKnowledgeIndexStruct[] | null;
  /** Namedvecsdatas */
  namedVecsDatas?: NamedValueVecsData[] | null;
  /** Namedprompts */
  namedPrompts?: NamedValueStr[] | null;
  /** @example "DOWN_CREATING" */
  status?: BotStatus | null;
  /**
   * Createdat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  createdAt?: string | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
  /** Draft */
  draft?: boolean | null;
  /** Published */
  published?: boolean | null;
  /**
   * Instuids
   * @default []
   */
  instUids?: string[] | null;
  /** Activeinstuid */
  activeInstUid?: string | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
  /** Boturl */
  botUrl?: string | null;
}

/** BotCreateParams */
export interface BotCreateParams {
  /**
   * Namedknowledgeuids2S
   * @example {"name":"0","ids":["Nuz9Ts-Docenty-PAB94Axg"]}
   */
  namedKnowledgeUids2s?: NamedIds[] | null;
  /** Namedvecsnamespaces */
  namedVecsNamespaces?: NamedId[] | null;
  /**
   * Showsources
   * @default true
   * @example true
   */
  showSources?: boolean | null;
  /** Ownership */
  ownership?: BotOwnershipParams | null;
  /** View */
  view?: BotViewParams | null;
  /** Model */
  model?: BotModelParams | null;
  /** Draft */
  draft?: boolean | null;
  /** Published */
  published?: boolean | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
}

/** BotCreateReq */
export interface BotCreateReq {
  /**
   * Namedknowledgeuids2S
   * @example {"name":"0","ids":["Nuz9Ts-Docenty-PAB94Axg"]}
   */
  namedKnowledgeUids2s?: NamedIds[] | null;
  /** Namedvecsnamespaces */
  namedVecsNamespaces?: NamedId[] | null;
  /**
   * Showsources
   * @default true
   */
  showSources?: boolean;
  /**
   * Ownership
   * @example {"acntUid":"docenty-abcdefgh","wsUid":"default"}
   */
  ownership: BotOwnershipParams;
  /** View */
  view?: BotViewParams | null;
  /** Model */
  model?: BotModelParams | null;
  /** Draft */
  draft?: boolean | null;
  /**
   * Published
   * @default true
   * @example true
   */
  published?: boolean | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
}

/** BotCreateResp */
export interface BotCreateResp {
  /** Clonebotclsuid */
  cloneBotClsUid?: string | null;
  /** Items */
  items?: BotClsDto[] | null;
  /** Instantiate */
  instantiate?: boolean | null;
}

/** BotDeleteReq */
export interface BotDeleteReq {
  /**
   * Deletebot
   * Not implemented yet.
   */
  deleteBot: BotCreateParams;
}

/** BotModelParams */
export interface BotModelParams {
  /** Namedprompts */
  namedPrompts?: NamedValueStr[] | null;
}

/** BotOwnershipParams */
export interface BotOwnershipParams {
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @example "default"
   */
  wsUid: string;
  /**
   * Trialemail
   * @example "dcty.swe.dev.shared@docenty.ai"
   */
  trialEmail?: string | null;
  /**
   * Creatorfireauthuid
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  creatorFireAuthUid?: string | null;
}

/**
 * BotStatus
 * An enumeration.
 */
export enum BotStatus {
  STABLE_ANY = "STABLE_ANY",
  UNSTABLE_UPDATING = "UNSTABLE_UPDATING",
  DOWN_CREATING = "DOWN_CREATING",
  DOWN_UPDATING = "DOWN_UPDATING",
  DOWN_FAILED = "DOWN_FAILED",
  DOWN_DELETED = "DOWN_DELETED",
  TASK_SUCCEEDED = "TASK_SUCCEEDED",
  TASK_FAILED = "TASK_FAILED",
  DOCS_SUCCEEDED = "DOCS_SUCCEEDED",
  DOCS_FAILED = "DOCS_FAILED",
  KNLG_SUCCEEDED = "KNLG_SUCCEEDED",
  KNLG_FAILED = "KNLG_FAILED",
  BOTCLS_SUCCEEDED = "BOTCLS_SUCCEEDED",
  BOTCLS_FAILED = "BOTCLS_FAILED",
}

/** BotUpdateReq */
export interface BotUpdateReq {
  /**
   * Updateparams
   * Update > Delete
   */
  updateParams?: BotCreateParams | null;
  /**
   * Deleteparams
   * Not implemented yet.
   */
  deleteParams?: BotCreateParams | null;
  /**
   * Conditionprops
   * Update or delete if this condition is not None. Not implemented yet.
   */
  conditionProps?: BotCreateParams | null;
  /** Instantiate */
  instantiate?: boolean | null;
  /**
   * Ownership
   * @example {"acntUid":"docenty-abcdefgh","wsUid":"default"}
   */
  ownership?: BotOwnershipParams | null;
}

/** BotViewParams */
export interface BotViewParams {
  /**
   * Title
   * @example "Docenty Bot"
   */
  title?: string | null;
  /**
   * Displayname
   * @example "Docenty Bot"
   */
  displayName?: string | null;
  /** Extrafrontinfo */
  extraFrontInfo?: object | null;
}

/** ChatDatasource */
export interface ChatDatasource {
  /** Chatsources */
  chatSources: ChatSource[];
}

/** ChatReq */
export interface ChatReq {
  /** @example "USER" */
  role: SpeakerRole;
  /**
   * Base abstract Message class.
   *
   * Messages are the inputs and outputs of ChatModels.
   */
  message: Message;
  /**
   * Botname
   * Either botName or botClsUid should be provided.
   */
  botName?: string | null;
  /**
   * Botclsuid
   * Either botName or botClsUid should be provided.
   */
  botClsUid?: string | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
  /**
   * @default "azure_openai"
   * @example "azure_openai"
   */
  openAi?: LangchainOpenai | null;
  /** Userlang */
  userLang?: string | null;
  /** Docmainlang */
  docMainLang?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid?: string | null;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /** Useremail */
  userEmail?: string;
  /** Channelname */
  channelName?: string;
  /**
   * Is Streaming
   * @default false
   */
  is_streaming?: boolean;
}

/** ChatRespData */
export interface ChatRespData {
  /** Datasource */
  datasource?: ChatDatasource | null;
  /** Messageuid */
  messageUid?: string | null;
  /** Messagegenuuid */
  messageGenUuid?: string | null;
  /**
   * Base abstract Message class.
   *
   * Messages are the inputs and outputs of ChatModels.
   */
  botMessage: Message;
  /**
   * Answer
   * @example "Docenty는 인공지능을 활용하여 사용자의 웹사이트나 기존 문서를 기반으로 맞춤형 AI 챗봇을 자동으로 생성하는 B2B SaaS 제품입니다."
   */
  answer: string;
  /** Etc */
  etc?: object | null;
  /**
   * Modelname
   * @example "gpt-4o"
   */
  modelName: string;
  /**
   * @default "azure_openai"
   * @example "azure_openai"
   */
  openAi?: LangchainOpenai | null;
}

/**
 * ChatSource
 * Related contents info for the question.
 */
export interface ChatSource {
  /**
   * Url
   * @example "https://www.docenty.ai/"
   */
  url?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /**
   * Filename
   * @example "www.docenty.ai/_index.html"
   */
  fileName?: string | null;
  /**
   * Itemkey
   * @example "https://www.docenty.ai/"
   */
  itemKey?: string | null;
  /**
   * Pagenum
   * @example 1
   */
  pageNum?: number | null;
  /**
   * Score
   * @example 0.726478457
   */
  score?: number | null;
  /**
   * Similarity
   * @default true
   * @example true
   */
  similarity?: boolean | null;
  /**
   * Pagecontent
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  pageContent?: string | null;
  /** Images Path */
  images_path?: string[] | null;
  /** Description */
  description?: string | null;
}

/** Content */
export interface Content {
  /** Content Id */
  content_id: string;
  /** Question */
  question?: string;
  /** Answer */
  answer: string;
  /** Keywords */
  keywords?: string[];
  /** Images Path */
  images_path?: string[];
  /** Button */
  button?: object;
  /** Form */
  form?: object;
}

/**
 * DctItemDoc
 * Document Mapping class.
 *
 * Fields:
 *
 * - `id` - MongoDB document ObjectID "_id" field.
 * Mapped to the PydanticObjectId class
 */
export interface DctItemDoc {
  /**
   *  Id
   * MongoDB document ObjectID
   * @example "5eb7cf5a86d9755df3a6c593"
   */
  _id?: string;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @example "default"
   */
  wsUid: string;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid?: string;
  /**
   * Uid
   * @example "doc-web-Nuz9Ts-Name78-XVX73f383oHRXVKP"
   */
  uid: string;
  /** @example "scraped" */
  loadingName: DocLoadingName;
  /** Documents */
  documents?: PagedDocument | null;
}

/**
 * DocLoadingName
 * An enumeration.
 */
export enum DocLoadingName {
  Scraped = "scraped",
  Uploaded = "uploaded",
  Written = "written",
  Ingested = "ingested",
}

/** ExtChatReq */
export interface ExtChatReq {
  /**
   * Base abstract Message class.
   *
   * Messages are the inputs and outputs of ChatModels.
   */
  message: Message;
  /**
   * Botclsuid
   * Either botName or botClsUid should be provided.
   */
  botClsUid?: string | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
}

/** ExtChatRespData */
export interface ExtChatRespData {
  /**
   * Answer
   * @example "Docenty는 인공지능을 활용하여 사용자의 웹사이트나 기존 문서를 기반으로 맞춤형 AI 챗봇을 자동으로 생성하는 B2B SaaS 제품입니다."
   */
  answer: string;
}

/** FileLoadingReqData */
export interface FileLoadingReqData {
  /** @default "UPLOAD_File_Plain" */
  ingestionType?: IngestionType;
  /** Basepath */
  basePath?: string | null;
  /** Filenames */
  fileNames?: FileReqList[] | null;
}

/** FileReqList */
export interface FileReqList {
  /** Filename */
  fileName: string;
  /**
   * Filetype
   * @default "application/octet-stream"
   */
  fileType?: string;
}

/** GenerateUrlsResp */
export interface GenerateUrlsResp {
  /** Genurls */
  genUrls: Record<string, string>;
  /**
   * Basepath
   * @format path
   */
  basePath?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** IngestedItem */
export interface IngestedItem {
  /**
   * Itemkey
   * @example "https://www.docenty.ai/"
   */
  itemKey: string;
  /**
   * Source
   * @example "https://www.docenty.ai/"
   */
  source?: string | null;
  /** Filepath */
  filePath?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
}

/**
 * IngestionType
 * An enumeration.
 */
export enum IngestionType {
  SCRAPEWebPlain = "SCRAPE_Web_Plain",
  UPLOADFilePlain = "UPLOAD_File_Plain",
  FILEPdfPlain = "FILE_Pdf_Plain",
  FILECsvStructured = "FILE_Csv_Structured",
  MDBCsvPlain = "MDB_Csv_Plain",
  MDBQnaQna = "MDB_Qna_Qna",
  MDBTextPlain = "MDB_Text_Plain",
  UPLOADImagePlain = "UPLOAD_Image_Plain",
}

/** ItemDeleteReq */
export interface ItemDeleteReq {
  /**
   * Uid
   * @example "doc-web-Nuz9Ts-Name78-XVX73f383oHRXVKP"
   */
  uid: string;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @example "default"
   */
  wsUid: string;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid?: string;
}

/** ItemGetResp */
export interface ItemGetResp {
  /**
   * Result
   * @example [{"taskUid":"task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY","status":"COMPLETED_SUCCEEDED","updatedAt":"2024-01-01T01:11:11.111111","createdAt":"2024-01-01T01:11:11.111111"}]
   */
  result?: DctItemDoc[] | null;
}

/** ItemKeyStatus */
export interface ItemKeyStatus {
  /** Used Itemkeys */
  used_itemkeys?: string[] | null;
  /** Unused Itemkeys */
  unused_itemkeys?: string[] | null;
  /** Deleted Itemkeys */
  deleted_itemkeys?: string[] | null;
}

/** ItemReqPagedDocument */
export interface ItemReqPagedDocument {
  /**
   * Modified Pagecontent
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  modified_pageContent?: string | null;
  /**
   * Title
   * @example "Docenty - AI Chatbot For your website"
   */
  title?: string | null;
  /**
   * @default "USED"
   * @example "USED"
   */
  status?: PagedDocumentStatus | null;
}

/** ItemSelectionDocToDto */
export interface ItemSelectionDocToDto {
  /**
   * Itemuid
   * @example "Nuz9Ts-Docenty-PAB94Axg"
   */
  itemuid: string;
  /** Itemkey */
  itemkey: string;
  /**
   * Modified Pagecontent
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  modified_pageContent?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /** @example "scraped" */
  type?: DocLoadingName | null;
  /** @example "USED" */
  status?: PagedDocumentStatus | null;
  /**
   * Createdat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  createdAt?: string | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
  /** Metadata */
  metadata?: object;
}

/** ItemUpdateReq */
export interface ItemUpdateReq {
  /**
   * Uid
   * @example "doc-web-Nuz9Ts-Name78-XVX73f383oHRXVKP"
   */
  uid: string;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @example "default"
   */
  wsUid: string;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid?: string;
  /** Document */
  document: ItemReqPagedDocument;
}

/** ItemUpdateResp */
export interface ItemUpdateResp {
  /**
   * Result
   * @example [{"taskUid":"task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY","status":"COMPLETED_SUCCEEDED","updatedAt":"2024-01-01T01:11:11.111111","createdAt":"2024-01-01T01:11:11.111111"}]
   */
  result?: DctItemDoc | null;
}

/** KakaoChatExpiredSessionReq */
export interface KakaoChatExpiredSessionReq {
  /**
   * Pf Id
   * 플러스 친구 아이디
   * @example "@svcdevbiztalk"
   */
  pf_id: string;
  /**
   * User Key
   * 사용자 키
   * @example "MZjEVK4x18_V"
   */
  user_key: string;
  /**
   * Session Id
   * 종료된 세션 아이디
   * @example "123"
   */
  session_id: string;
}

/** KakaoChatMessageReq */
export interface KakaoChatMessageReq {
  /**
   * Pf Id
   * 플러스 친구 아이디
   * @example "@svcdevbiztalk"
   */
  pf_id: string;
  /**
   * User Key
   * 유저 키
   * @example "MZjEVK4x18_V"
   */
  user_key: string;
  /**
   * Type
   * 사용자가 전송한 메시지 종류 (text, photo, video, audio)
   * @example "text"
   */
  type: string;
  /**
   * Content
   * 사용자가 전송한 메시지. type이 text가 아닌 미디어인 경우 json
   * @example "안녕하세요"
   */
  content: string;
  /**
   * Contents
   * 사용자가 전송한 데이터 배열
   * @default []
   */
  contents?: string[];
  /**
   * Attachment
   * 전체 메시지의 첨부 파일 URL
   */
  attachment?: string;
  /**
   * Extra
   * 사용자가 전송한 메시지의 extra 정보
   */
  extra?: string;
  /**
   * Acnt Uid
   * 계정 UID
   * @default "None"
   * @example "None"
   */
  acnt_uid?: string;
  /**
   * Asctime
   * 타임스탬프
   * @default "2024-07-29T16:32:09"
   * @example "2024-07-29T16:32:09"
   */
  asctime?: string;
  /**
   * Levelname
   * 로그 레벨
   * @default "INFO"
   * @example "INFO"
   */
  levelname?: string;
  /**
   * Message
   * 메시지
   * @default ""
   * @example ""
   */
  message?: string;
  /**
   * Name
   * 로거 이름
   * @default "src.main"
   * @example "src.main"
   */
  name?: string;
  /**
   * Request Id
   * 요청 ID
   * @default "None"
   * @example "None"
   */
  request_id?: string;
  /**
   * Status
   * 상태
   * @default "INFO"
   * @example "INFO"
   */
  status?: string;
  /**
   * Ws Uid
   * 웹 서비스 UID
   * @default "None"
   * @example "None"
   */
  ws_uid?: string;
  /**
   * Yellow Id
   * 옐로우 아이디
   * @example "@도슨티"
   */
  yellow_id: string;
}

/** KakaoChatReferenceReq */
export interface KakaoChatReferenceReq {
  /**
   * Pf Id
   * 플러스 친구 아이디
   * @example "@svcdevbiztalk"
   */
  pf_id: string;
  /**
   * User Key
   * 유저 키
   * @example "MZjEVK4x18_V"
   */
  user_key: string;
  /**
   * App User Id
   * 앱 유저 아이디
   */
  app_user_id?: number;
  /**
   * Reference
   * 고객사에서 설정한 메타 정보
   */
  reference?: object;
  /**
   * Last Reference
   * 마지막 메타 정보
   */
  last_reference?: object;
  /**
   * Session Id
   * 세션 아이디
   */
  session_id?: string;
  /**
   * Chatbot Messages
   * 챗봇 대화 내역
   */
  chatbot_messages?: object[];
}

/** KakaoChatResp */
export interface KakaoChatResp {
  /**
   * Msg
   * @default "Received"
   * @example "Received"
   */
  msg?: string;
  /**
   * Data
   * Received data object
   */
  data:
    | KakaoChatReferenceReq
    | KakaoChatMessageReq
    | KakaoChatExpiredSessionReq
    | KakaoChatResultReq;
}

/** KakaoChatResultReq */
export interface KakaoChatResultReq {
  /**
   * Pf Id
   * 플러스 친구 아이디
   * @example "@svcdevbiztalk"
   */
  pf_id?: string;
  /**
   * Serial Number
   * 요청 일련번호
   * @example "1001982167_605498276"
   */
  serial_number: string;
  /**
   * Request Type
   * 요청 타입
   * @example "activate"
   */
  request_type: string;
  /**
   * Code
   * 처리 결과 코드
   * @example "0"
   */
  code: string;
  /**
   * Message
   * 오류 메시지
   * @example "NoJsonBodyException(1)"
   */
  message?: string;
  /**
   * Image
   * 업로드된 이미지 경로
   * @example "http://mudkage.kakao.com/dn/sdjhfksdf/adfkjhd/asdkfj/original.jpg"
   */
  image?: string;
  /**
   * File
   * 업로드된 파일 경로
   * @example "http://mudkage.kakao.com/dn/sdjhfksdf/adfkjhd/asdkfj/original.pdf"
   */
  file?: string;
  /**
   * File Name
   * 업로드된 파일 이름
   * @example "파일테스트.pdf"
   */
  file_name?: string;
  /**
   * File Size
   * 업로드된 파일 용량
   * @example "123456"
   */
  file_size?: string;
}

/** KnowledgeCreateReq */
export interface KnowledgeCreateReq {
  /** Itemkeyselections */
  itemkeySelections?: string[] | null;
  /**
   * Basename
   * @example "docenty"
   */
  baseName?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
  /** Botcreatereq */
  botCreateReq?: BotCreateReq | null;
}

/** KnowledgeCreateResp */
export interface KnowledgeCreateResp {
  /** Item */
  item?: KnowledgeDto | null;
}

/** KnowledgeDeleteReq */
export interface KnowledgeDeleteReq {
  /**
   * Uid
   * @example "Nuz9Ts-Docenty-PAB94Axg"
   */
  uid?: string | null;
  /**
   * Ownership
   * @example {"acntUid":"docenty-abcdefgh","wsUid":"default"}
   */
  ownership?: BotOwnershipParams | null;
}

/** KnowledgeDto */
export interface KnowledgeDto {
  /**
   * Uid
   * @example "Nuz9Ts-Docenty-PAB94Axg"
   */
  uid: string;
  /**
   * Name
   * @example "docenty"
   */
  name?: string | null;
  /** Itemselections */
  itemSelections?: ItemSelectionDocToDto[] | null;
  /** Faileddocitemkeysdict */
  failedDocItemKeysDict?: Record<string, string[]>;
  /** Vecsdata */
  vecsData?: VecsData | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /** Metadata */
  metadata?: object | null;
  /**
   * Createdat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  createdAt?: string | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
}

/** KnowledgeGetResp */
export interface KnowledgeGetResp {
  /** Items */
  items?: KnowledgeDto[] | null;
}

/** KnowledgeIndexStruct */
export interface KnowledgeIndexStruct {
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @example "default"
   */
  wsUid: string;
  /** Name */
  name?: string | null;
  /**
   * Uid
   * @example "Nuz9Ts-Docenty-PAB94Axg"
   */
  uid: string;
}

/** KnowledgeUpdateReq */
export interface KnowledgeUpdateReq {
  /**
   * Uid
   * @example "Nuz9Ts-Docenty-PAB94Axg"
   */
  uid?: string | null;
  /** Itemkeyselections */
  itemkeySelections?: ItemKeyStatus | null;
  /**
   * Basename
   * @example "docenty"
   */
  baseName?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /**
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  modelName?: ModelName | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Includepagecontent
   * @default false
   * @example false
   */
  includePageContent?: boolean | null;
}

/**
 * LangchainOpenai
 * An enumeration.
 */
export enum LangchainOpenai {
  ChatOpenai = "chat_openai",
  AzureOpenai = "azure_openai",
  Ollama = "ollama",
}

/**
 * Message
 * Base abstract Message class.
 *
 * Messages are the inputs and outputs of ChatModels.
 */
export interface Message {
  /**
   * Content
   * @example "Docenty 가 뭐야?"
   */
  content: string;
  /** Additional Kwargs */
  additional_kwargs?: object;
  /** Response Metadata */
  response_metadata?: object;
  /**
   * Type
   * @example "ai"
   */
  type?: string | null;
  /** Name */
  name?: string;
  /** Id */
  id?: string;
  /**
   * @default "USER"
   * @example "USER"
   */
  speakerRole?: SpeakerRole | null;
  /**
   * Prompt
   * @example "한글로 대답해"
   */
  prompt?: string | null;
  /** Params */
  params?: object | null;
  /**
   * Sentuuid
   * Message uuid generated by sender.
   */
  sentUuid?: string | null;
  /**
   * Originsentuuid
   * Target message uuid generated by sender.
   */
  originSentUuid?: string | null;
  /**
   * Uid
   * Not supported yet.
   */
  uid?: string | null;
  /** Action */
  action?: string | null;
  /** Actionparams */
  actionParams?: object | null;
  /** Origin */
  origin?: Message | null;
}

/**
 * ModelName
 * An enumeration.
 */
export enum ModelName {
  Gpt35Turbo = "gpt-3.5-turbo",
  Gpt35Turbo1106 = "gpt-3.5-turbo-1106",
  Gpt35Turbo0125 = "gpt-3.5-turbo-0125",
  Gpt4 = "gpt-4",
  Gpt41106Preview = "gpt-4-1106-preview",
  Gpt4Turbo = "gpt-4-turbo",
  Gpt4O = "gpt-4o",
  Gpt4OMini = "gpt-4o-mini",
  UpstageSolar1MiniChatKo = "upstage/solar-1-mini-chat-ko",
  Llama3 = "llama3",
  Llama370B = "llama3:70b",
}

/** NamedId */
export interface NamedId {
  /** Name */
  name: string;
  /** Id */
  id?: string;
}

/** NamedIds */
export interface NamedIds {
  /** Name */
  name: string;
  /** Ids */
  ids?: string[];
}

/** NamedValue[VecsData] */
export interface NamedValueVecsData {
  /** Name */
  name: string;
  value?: VecsData;
}

/** NamedValue[str] */
export interface NamedValueStr {
  /** Name */
  name: string;
  /** Value */
  value?: string;
}

/** NamedValues[KnowledgeIndexStruct] */
export interface NamedValuesKnowledgeIndexStruct {
  /** Name */
  name: string;
  values: KnowledgeIndexStruct;
}

/** PagedDocument */
export interface PagedDocument {
  /**
   * Original Pagecontent
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  original_pageContent?: string | null;
  /**
   * Modified Pagecontent
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  modified_pageContent?: string | null;
  /**
   * Source
   * @example "https://www.docenty.ai/"
   */
  source?: string | null;
  /**
   * Title
   * @example "Docenty"
   */
  title?: string | null;
  /** Contentpath */
  contentPath?: string | null;
  /**
   * Pagepath
   * @example "https://www.docenty.ai/"
   */
  pagePath?: string | null;
  /**
   * Pagenum
   * @example 1
   */
  pageNum?: number | null;
  /**
   * Itemkey
   * @example "https://www.docenty.ai/"
   */
  itemKey?: string | null;
  /**
   * @default "USED"
   * @example "USED"
   */
  status?: PagedDocumentStatus | null;
  /**
   * Createdat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  createdAt?: string | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
  /**
   * Deletedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  deletedAt?: string | null;
  /** Metadata */
  metadata?: object;
}

/**
 * PagedDocumentStatus
 * An enumeration.
 */
export enum PagedDocumentStatus {
  USED = "USED",
  UNUSED = "UNUSED",
  DELETE = "DELETE",
}

/** PrepareBpReq */
export interface PrepareBpReq {
  /** Task Ws Path */
  task_ws_path: string;
  /** Scraping Base Name */
  scraping_base_name: string;
  /** Bucket Name */
  bucket_name: string;
  /** Files */
  files?: object[];
  /**
   * Type
   * @default "chochangpae"
   */
  type?: string;
  /** Prompt */
  prompt?: object;
}

/** PrepareBpResp */
export interface PrepareBpResp {
  /** Task Ws Path */
  task_ws_path: string;
  /** Scraping Base Name */
  scraping_base_name: string;
  /** Task Name */
  task_name: string;
  /** Sucedded File Paths */
  sucedded_file_paths: string[];
  /** Failed File Paths */
  failed_file_paths: string[];
}

/** QaCreateParameter */
export interface QaCreateParameter {
  /**
   * Document Mapping class.
   *
   * Fields:
   *
   * - `id` - MongoDB document ObjectID "_id" field.
   * Mapped to the PydanticObjectId class
   */
  qa_node: QaNode;
  /** Parent Uids */
  parent_uids?: string[];
}

/** QaCreateResponse */
export interface QaCreateResponse {
  /**
   * Document Mapping class.
   *
   * Fields:
   *
   * - `id` - MongoDB document ObjectID "_id" field.
   * Mapped to the PydanticObjectId class
   */
  qa_node: QaNode;
}

/** QaDeleteParameter */
export interface QaDeleteParameter {
  /** Qa Node Uid */
  qa_node_uid: string;
}

/** QaDeleteResponse */
export interface QaDeleteResponse {
  /** Request Success */
  request_success?: boolean;
}

/** QaGetResponse */
export interface QaGetResponse {
  /** Qa Nodes */
  qa_nodes?: QaNode[];
}

/**
 * QaNode
 * Document Mapping class.
 *
 * Fields:
 *
 * - `id` - MongoDB document ObjectID "_id" field.
 * Mapped to the PydanticObjectId class
 */
export interface QaNode {
  /**
   *  Id
   * MongoDB document ObjectID
   * @example "5eb7cf5a86d9755df3a6c593"
   */
  _id?: string;
  /** Title */
  title?: string;
  /** Qa Uid */
  qa_uid: string;
  /** Account Uid */
  account_uid: string;
  /** Workspace Uid */
  workspace_uid: string;
  /** Bot Class Uids */
  bot_class_uids?: string[];
  /** Question */
  question: string;
  /** Contents */
  contents?: Content[];
  /** Parent Uids */
  parent_uids?: string[];
  /**
   * Is Root
   * @default false
   */
  is_root?: boolean;
  /** Children */
  children?: QaNode[];
  /**
   * Created At
   * @format date-time
   * @default "2024-08-13T11:23:43.742978+00:00"
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   * @default "2024-08-13T11:23:43.742987+00:00"
   */
  updated_at?: string;
  /**
   * Is Activated
   * @default true
   */
  is_activated?: boolean;
}

/** QaRequest */
export interface QaRequest {
  create_request?: QaCreateParameter;
  update_request?: QaUpdateParameter;
  delete_request?: QaDeleteParameter;
}

/** QaResponse */
export interface QaResponse {
  create_response?: QaCreateResponse;
  get_response?: QaGetResponse;
  update_response?: QaUpdateResponse;
  delete_response?: QaDeleteResponse;
}

/** QaUpdateParameter */
export interface QaUpdateParameter {
  /** Qa Node Uid */
  qa_node_uid: string;
  /** Question */
  question?: string;
  /** Contents */
  contents?: Content[];
  /** Children */
  children?: QaNode[];
  /** Delete Bot Class Uids */
  delete_bot_class_uids?: string[];
  /** Add Bot Class Uids */
  add_bot_class_uids?: string[];
}

/** QaUpdateResponse */
export interface QaUpdateResponse {
  /** Qa Nodes */
  qa_nodes?: QaNode[];
}

/** RespError */
export interface RespError {
  /** Code */
  code?: number | null;
  /** Msg */
  msg?: string | null;
  /** Desc */
  desc?: string | any[] | object | null;
}

/** RespMeta */
export interface RespMeta {
  /** Code */
  code?: number | null;
  /** Errors */
  errors?: RespError[] | null;
}

/** ScrapeWebReq */
export interface ScrapeWebReq {
  reqData: ScrapeWebReqData;
  /**
   * Taskbasename
   * @example "docenty"
   */
  taskBaseName?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
}

/** ScrapeWebReqData */
export interface ScrapeWebReqData {
  /** @default "SCRAPE_Web_Plain" */
  ingestionType?: IngestionType;
  /**
   * Starturls
   * @default []
   * @example ["https://www.docenty.ai/"]
   */
  startUrls?: string[] | null;
  /**
   * Leafurls
   * @default []
   * @example ["https://docenty.notion.site/b54e2a0eb9b14471b90e25f6b6b59447"]
   */
  leafUrls?: string[] | null;
  /**
   * Alloweddomains
   * @example ["docenty.ai"]
   */
  allowedDomains?: string[] | null;
  /** Allowedpatterns */
  allowedPatterns?: string[] | null;
  /** Deniedpatterns */
  deniedPatterns?: string[] | null;
  /**
   * Depthlimit
   * @default 3
   * @example 3
   */
  depthLimit?: number | null;
  /**
   * Navigationtimeoutsec
   * @default 120
   * @example 120
   */
  navigationTimeoutSec?: number | null;
  /**
   * Perpagelinklimit
   * @default 20
   * @example 20
   */
  perPageLinkLimit?: number | null;
  /** Ignoreurls */
  ignoreUrls?: string[] | null;
  /**
   * Gitbookload
   * @example ["https://www.docenty.ai/"]
   */
  gitbookLoad?: string[] | null;
  /** @default "playwright" */
  scraper?: ScraperType;
  /**
   * Endpointtype
   * @default "html"
   * @example "html"
   */
  endPointType?: string | null;
}

/** ScrapeWebResp */
export interface ScrapeWebResp {
  /**
   * Wspath
   * @example "docenty-abcdefgh/default"
   */
  wsPath: string;
  /**
   * Starturls
   * @example ["https://www.docenty.ai/"]
   */
  startUrls?: string[] | null;
  /**
   * Leafurls
   * @example ["https://docenty.notion.site/b54e2a0eb9b14471b90e25f6b6b59447"]
   */
  leafUrls?: string[] | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid: string;
}

/**
 * ScraperType
 * An enumeration.
 */
export enum ScraperType {
  Playwright = "playwright",
  Zyte = "zyte",
  Scrapy = "scrapy",
}

/** SmartReq */
export interface SmartReq {
  /** Web Reqdata */
  web_reqData?: ScrapeWebReqData[] | null;
  /** File Reqdata */
  file_reqData?: FileLoadingReqData[] | null;
  /** Text Reqdata */
  text_reqData?: WriteTextReqData[] | null;
  /** Usermedia Reqdata */
  userMedia_reqData?: UserMediaReqData[] | null;
  /**
   * Taskbasename
   * @example "docenty"
   */
  taskBaseName?: string | null;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @example "default"
   */
  wsUid: string;
}

/**
 * SpeakerRole
 * An enumeration.
 */
export enum SpeakerRole {
  BOT = "BOT",
  USER = "USER",
  AGENT = "AGENT",
}

/** StartupPackageReqData */
export interface StartupPackageReqData {
  /** Message */
  message: string;
  /** Vecs Name */
  vecs_name: string;
  /**
   * Model Name
   * @default "gpt-4o"
   * @example "gpt-4o"
   */
  model_name?: string | null;
  /**
   * Type
   * @default "chochangpae"
   * @example "chochangpae"
   */
  type?: string | null;
  /**
   * Account Id
   * @default "a19"
   * @example "a19"
   */
  account_id?: string | null;
}

/** StoreFilesReq */
export interface StoreFilesReq {
  reqData: FileLoadingReqData;
  /**
   * Taskbasename
   * @example "docenty"
   */
  taskBaseName?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid?: string | null;
  /**
   * {<DocLoadingName.scraped: 'scraped'>: 'Scraped', <DocLoadingName.uploaded: 'uploaded'>: 'Uploaded', <DocLoadingName.written: 'written'>: 'Written Text', <DocLoadingName.ingested: 'ingested'>: 'Not used yet'}
   * @default "uploaded"
   * @example "uploaded"
   */
  loadingName?: DocLoadingName;
  /**
   * Forceupdatedb
   * @default false
   * @example false
   */
  forceUpdateDb?: boolean;
  /**
   * Includeresult
   * @default false
   * @example false
   */
  includeResult?: boolean | null;
}

/** StoreTextReq */
export interface StoreTextReq {
  reqData: WriteTextReqData;
  /**
   * Taskbasename
   * @example "docenty"
   */
  taskBaseName?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * {<DocLoadingName.scraped: 'scraped'>: 'Scraped', <DocLoadingName.uploaded: 'uploaded'>: 'Uploaded', <DocLoadingName.written: 'written'>: 'Written Text', <DocLoadingName.ingested: 'ingested'>: 'Not used yet'}
   * @default "written"
   * @example "written"
   */
  loadingName?: DocLoadingName | null;
  /**
   * Forceupdatedb
   * @default false
   * @example false
   */
  forceUpdateDb?: boolean;
  /**
   * Includeresult
   * @default false
   * @example false
   */
  includeResult?: boolean | null;
}

/** TaskResult */
export interface TaskResult {
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid: string;
  /** Acntuid */
  acntUid?: string | null;
  /** Wsuid */
  wsUid?: string | null;
  loadingName?: DocLoadingName | null;
  /** Urlpaths */
  urlPaths?: string[] | null;
  /** Items */
  items?: IngestedItem[] | null;
  /** @example "COMPLETED_SUCCEEDED" */
  status?: TaskStatus | null;
}

/** TaskResultData */
export interface TaskResultData {
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid: string;
  /** Result */
  result?: TaskResult | null;
  /** @example "COMPLETED_SUCCEEDED" */
  status?: TaskStatus | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
  /**
   * Createdat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  createdAt?: string | null;
}

/**
 * TaskStatus
 * An enumeration.
 */
export enum TaskStatus {
  UNKNOWN = "UNKNOWN",
  NONE = "NONE",
  STARTED = "STARTED",
  PROGRESS_ANY = "PROGRESS_ANY",
  PROGRESS_NORMAL = "PROGRESS_NORMAL",
  PROGRESS_SUSPICIOUS = "PROGRESS_SUSPICIOUS",
  PROGRESS_FAILED = "PROGRESS_FAILED",
  PROGRESS_CANCELLED = "PROGRESS_CANCELLED",
  COMPLETED_ANY = "COMPLETED_ANY",
  COMPLETED_SUCCEEDED = "COMPLETED_SUCCEEDED",
  COMPLETED_FAILED = "COMPLETED_FAILED",
  COMPLETED_CANCELLED = "COMPLETED_CANCELLED",
  COMPLETED_ERROR = "COMPLETED_ERROR",
  DELETED = "DELETED",
}

/** UserMediaReq */
export interface UserMediaReq {
  reqData: UserMediaReqData;
  /**
   * Taskbasename
   * @example "docenty"
   */
  taskBaseName?: string | null;
  /**
   * Acntuid
   * @example "docenty-abcdefgh"
   */
  acntUid: string;
  /**
   * Wsuid
   * @default "default"
   * @example "default"
   */
  wsUid?: string | null;
  /**
   * Taskuid
   * @example "task-file-Nuz9Ts-task-file-Hyeonseop-XQ6XJKcc4z-XQ6X2bPNsY"
   */
  taskUid?: string | null;
  /**
   * {<DocLoadingName.scraped: 'scraped'>: 'Scraped', <DocLoadingName.uploaded: 'uploaded'>: 'Uploaded', <DocLoadingName.written: 'written'>: 'Written Text', <DocLoadingName.ingested: 'ingested'>: 'Not used yet'}
   * @default "uploaded"
   * @example "uploaded"
   */
  loadingName?: DocLoadingName;
  /**
   * Forceupdatedb
   * @default false
   * @example false
   */
  forceUpdateDb?: boolean;
  /**
   * Includeresult
   * @default false
   * @example false
   */
  includeResult?: boolean | null;
}

/** UserMediaReqData */
export interface UserMediaReqData {
  /** @example "UPLOAD_File_Plain" */
  ingestionType: IngestionType;
  /** Images Path */
  images_path?: string[];
  /** Keywords */
  keywords?: string[] | null;
  /** Query Sentence */
  query_sentence?: string | null;
  /**
   * Texts
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  texts?: string;
}

/** UserMediaResp */
export interface UserMediaResp {
  /** Result */
  result?: TaskResultData | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** VecsData */
export interface VecsData {
  /** Namespace */
  namespace: string;
  /** Vectorcount */
  vectorCount?: number | null;
  /**
   * Updatedat
   * @format date-time
   * @example "2024-01-01T01:11:11.111111"
   */
  updatedAt?: string | null;
}

/** WebResp[AccountResp] */
export interface WebRespAccountResp {
  /** Data */
  data?: AccountResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[BotCreateResp] */
export interface WebRespBotCreateResp {
  /** Data */
  data?: BotCreateResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[ChatRespData] */
export interface WebRespChatRespData {
  /** Data */
  data?: ChatRespData | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[DctItemDoc] */
export interface WebRespDctItemDoc {
  /** Data */
  data?: DctItemDoc | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[ExtChatRespData] */
export interface WebRespExtChatRespData {
  /** Data */
  data?: ExtChatRespData | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[GenerateUrlsResp] */
export interface WebRespGenerateUrlsResp {
  /** Data */
  data?: GenerateUrlsResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[ItemGetResp] */
export interface WebRespItemGetResp {
  /** Data */
  data?: ItemGetResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[ItemUpdateResp] */
export interface WebRespItemUpdateResp {
  /** Data */
  data?: ItemUpdateResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[KakaoChatResp] */
export interface WebRespKakaoChatResp {
  /** Data */
  data?: KakaoChatResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[KnowledgeCreateResp] */
export interface WebRespKnowledgeCreateResp {
  /** Data */
  data?: KnowledgeCreateResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[KnowledgeGetResp] */
export interface WebRespKnowledgeGetResp {
  /** Data */
  data?: KnowledgeGetResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[PrepareBpResp] */
export interface WebRespPrepareBpResp {
  /** Data */
  data?: PrepareBpResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[ScrapeWebResp] */
export interface WebRespScrapeWebResp {
  /** Data */
  data?: ScrapeWebResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[StoreFilesReq] */
export interface WebRespStoreFilesReq {
  /** Data */
  data?: StoreFilesReq | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WebResp[UserMediaResp] */
export interface WebRespUserMediaResp {
  /** Data */
  data?: UserMediaResp | null;
  /**
   * Meta
   * @default {"code":200}
   * @example {"code":200}
   */
  meta?: RespMeta | null;
}

/** WriteTextReqData */
export interface WriteTextReqData {
  /** @default "MDB_Text_Plain" */
  ingestionType?: IngestionType;
  /**
   * Texts
   * @example "답답한 ARS 선택 채팅은
   * 이제 그만! 상담 운영비 50% 절감
   * AI가 자동 생성해주는 AI..."
   */
  texts: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title DCTY Fastapi
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Verify an account
     *
     * @tags Account
     * @name GetItemApiV1AccountItemsGet
     * @summary Get Item
     * @request GET:/api/v1/account/items
     */
    getItemApiV1AccountItemsGet: (
      query: {
        /** Uid */
        uid: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespAccountResp, HTTPValidationError>({
        path: `/api/v1/account/items`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Edit an account
     *
     * @tags Account
     * @name UpdateItemApiV1AccountItemsPut
     * @summary Update Item
     * @request PUT:/api/v1/account/items
     */
    updateItemApiV1AccountItemsPut: (
      data: AccountUpdateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespAccountResp, HTTPValidationError>({
        path: `/api/v1/account/items`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create an account.
     *
     * @tags Account
     * @name CreateItemApiV1AccountItemsPost
     * @summary Create Item
     * @request POST:/api/v1/account/items
     */
    createItemApiV1AccountItemsPost: (
      data: AccountCreateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespAccountResp, HTTPValidationError>({
        path: `/api/v1/account/items`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an account
     *
     * @tags Account
     * @name DeleteItemApiV1AccountItemsDelete
     * @summary Delete Item
     * @request DELETE:/api/v1/account/items
     */
    deleteItemApiV1AccountItemsDelete: (
      data: AccountUpdateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespAccountResp, HTTPValidationError>({
        path: `/api/v1/account/items`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name ScrapeApiV1IngestScrapeWebPost
     * @summary Scrape
     * @request POST:/api/v1/ingest/scrape-web
     */
    scrapeApiV1IngestScrapeWebPost: (
      data: ScrapeWebReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespScrapeWebResp, HTTPValidationError>({
        path: `/api/v1/ingest/scrape-web`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Generate gcp signed url for file upload
     *
     * @tags Ingest
     * @name UploadUrlApiV1IngestGenerateUploadUrlPost
     * @summary Upload Url
     * @request POST:/api/v1/ingest/generate-upload-url
     */
    uploadUrlApiV1IngestGenerateUploadUrlPost: (
      data: StoreFilesReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespGenerateUrlsResp, HTTPValidationError>({
        path: `/api/v1/ingest/generate-upload-url`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name StoreFilesApiV1IngestUploadFilesPost
     * @summary Store Files
     * @request POST:/api/v1/ingest/upload-files
     */
    storeFilesApiV1IngestUploadFilesPost: (
      data: StoreFilesReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespStoreFilesReq, HTTPValidationError>({
        path: `/api/v1/ingest/upload-files`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Generate gcp signed url for image upload
     *
     * @tags Ingest
     * @name UploadImageUrlApiV1IngestGenerateImageUploadUrlPost
     * @summary Upload Image Url
     * @request POST:/api/v1/ingest/generate-image-upload-url
     */
    uploadImageUrlApiV1IngestGenerateImageUploadUrlPost: (
      data: UserMediaReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespGenerateUrlsResp, HTTPValidationError>({
        path: `/api/v1/ingest/generate-image-upload-url`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name SaveUserMediaApiV1IngestUserMediaPost
     * @summary Save User Media
     * @request POST:/api/v1/ingest/user-media
     */
    saveUserMediaApiV1IngestUserMediaPost: (
      data: UserMediaReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespUserMediaResp, HTTPValidationError>({
        path: `/api/v1/ingest/user-media`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name StoreTextApiV1IngestWriteTextsPost
     * @summary Store Text
     * @request POST:/api/v1/ingest/write-texts
     */
    storeTextApiV1IngestWriteTextsPost: (
      data: StoreTextReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespDctItemDoc, HTTPValidationError>({
        path: `/api/v1/ingest/write-texts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name GetItemsApiV1IngestItemsItemuidGet
     * @summary Get Items
     * @request GET:/api/v1/ingest/items/{itemuid}
     */
    getItemsApiV1IngestItemsItemuidGet: (
      itemuid: string,
      query: {
        /** Acntuid */
        acntUid: string;
        /** Wsuid */
        wsUid: string;
        /** Taskuid */
        taskUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespItemGetResp, HTTPValidationError>({
        path: `/api/v1/ingest/items/${itemuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name GetItemsApiV1IngestItemsGet
     * @summary Get Items
     * @request GET:/api/v1/ingest/items
     */
    getItemsApiV1IngestItemsGet: (
      query: {
        /** Acntuid */
        acntUid: string;
        /** Wsuid */
        wsUid: string;
        /** Taskuid */
        taskUid?: string;
        /** Itemuid */
        itemuid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespItemGetResp, HTTPValidationError>({
        path: `/api/v1/ingest/items`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ingest
     * @name DeleteItemsApiV1IngestItemsDelete
     * @summary Delete Items
     * @request DELETE:/api/v1/ingest/items
     */
    deleteItemsApiV1IngestItemsDelete: (
      data: ItemDeleteReq,
      query?: {
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespItemUpdateResp, HTTPValidationError>({
        path: `/api/v1/ingest/items`,
        method: "DELETE",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Only modified_pageContent and title can be changed
     *
     * @tags Ingest
     * @name PatchItemsApiV1IngestItemsPatch
     * @summary Patch Items
     * @request PATCH:/api/v1/ingest/items
     */
    patchItemsApiV1IngestItemsPatch: (
      data: ItemUpdateReq,
      query?: {
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespItemUpdateResp, HTTPValidationError>({
        path: `/api/v1/ingest/items`,
        method: "PATCH",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Chatbot updates are all done at once
     *
     * @tags Ingest
     * @name DeleteItemsApiV1IngestItemsBotClsUidDelete
     * @summary Delete Items
     * @request DELETE:/api/v1/ingest/items/{botClsUid}
     */
    deleteItemsApiV1IngestItemsBotClsUidDelete: (
      botClsUid: string,
      data: ItemDeleteReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/ingest/items/${botClsUid}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Only modified_pageContent and title can be changed, Chatbot updates are all done at once
     *
     * @tags Ingest
     * @name PatchItemsApiV1IngestItemsBotClsUidPatch
     * @summary Patch Items
     * @request PATCH:/api/v1/ingest/items/{botClsUid}
     */
    patchItemsApiV1IngestItemsBotClsUidPatch: (
      botClsUid: string,
      data: ItemUpdateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/ingest/items/${botClsUid}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create knowledgedoc and chatbot
     *
     * @tags Knowledge
     * @name CreateItemsApiV1KnlgItemsBotClsUidPost
     * @summary Create Items
     * @request POST:/api/v1/knlg/items/{botClsUid}
     */
    createItemsApiV1KnlgItemsBotClsUidPost: (
      botClsUid: string,
      data: KnowledgeCreateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/knlg/items/${botClsUid}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update knowledgedoc and chatbot
     *
     * @tags Knowledge
     * @name UpdateItemsApiV1KnlgItemsBotClsUidPatch
     * @summary Update Items
     * @request PATCH:/api/v1/knlg/items/{botClsUid}
     */
    updateItemsApiV1KnlgItemsBotClsUidPatch: (
      botClsUid: string,
      data: KnowledgeUpdateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/knlg/items/${botClsUid}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Knowledge
     * @name GetItemsApiV1KnlgItemsGet
     * @summary Get Items
     * @request GET:/api/v1/knlg/items
     */
    getItemsApiV1KnlgItemsGet: (
      query?: {
        /** Wsuid */
        wsUid?: string;
        /** Acntuid */
        acntUid?: string;
        /** Uid */
        uid?: string;
        /** Botclsuid */
        botClsUid?: string;
        /** Itemuid */
        itemUid?: string;
        /** Limit */
        limit?: number;
        /** Skip */
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeGetResp, HTTPValidationError>({
        path: `/api/v1/knlg/items`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Only create knowledgedoc
     *
     * @tags Knowledge
     * @name CreateItemsApiV1KnlgItemsPost
     * @summary Create Items
     * @request POST:/api/v1/knlg/items
     */
    createItemsApiV1KnlgItemsPost: (
      data: KnowledgeCreateReq,
      query?: {
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeCreateResp, HTTPValidationError>({
        path: `/api/v1/knlg/items`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description uid is required.
     *
     * @tags Knowledge
     * @name DeleteItemsApiV1KnlgItemsDelete
     * @summary Delete Items
     * @request DELETE:/api/v1/knlg/items
     */
    deleteItemsApiV1KnlgItemsDelete: (
      data: KnowledgeDeleteReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeCreateResp, HTTPValidationError>({
        path: `/api/v1/knlg/items`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Only Update knowledgedoc
     *
     * @tags Knowledge
     * @name UpdateItemsApiV1KnlgItemsPatch
     * @summary Update Items
     * @request PATCH:/api/v1/knlg/items
     */
    updateItemsApiV1KnlgItemsPatch: (
      data: KnowledgeUpdateReq,
      query?: {
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeCreateResp, HTTPValidationError>({
        path: `/api/v1/knlg/items`,
        method: "PATCH",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Knowledge
     * @name GetItemsApiV1KnlgItemsBotclsBotClsUidItemUidGet
     * @summary Get Items
     * @request GET:/api/v1/knlg/items/botcls/{botClsUid}/{itemUid}
     */
    getItemsApiV1KnlgItemsBotclsBotClsUidItemUidGet: (
      botClsUid: string,
      itemUid: string,
      query?: {
        /** Wsuid */
        wsUid?: string;
        /** Acntuid */
        acntUid?: string;
        /** Uid */
        uid?: string;
        /** Limit */
        limit?: number;
        /** Skip */
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeGetResp, HTTPValidationError>({
        path: `/api/v1/knlg/items/botcls/${botClsUid}/${itemUid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Knowledge
     * @name GetItemsApiV1KnlgItemsBotclsBotClsUidGet
     * @summary Get Items
     * @request GET:/api/v1/knlg/items/botcls/{botClsUid}
     */
    getItemsApiV1KnlgItemsBotclsBotClsUidGet: (
      botClsUid: string,
      query?: {
        /** Wsuid */
        wsUid?: string;
        /** Acntuid */
        acntUid?: string;
        /** Uid */
        uid?: string;
        /** Itemuid */
        itemUid?: string;
        /** Limit */
        limit?: number;
        /** Skip */
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeGetResp, HTTPValidationError>({
        path: `/api/v1/knlg/items/botcls/${botClsUid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Knowledge
     * @name GetItemsApiV1KnlgItemsUidGet
     * @summary Get Items
     * @request GET:/api/v1/knlg/items/{uid}
     */
    getItemsApiV1KnlgItemsUidGet: (
      uid: string,
      query?: {
        /** Wsuid */
        wsUid?: string;
        /** Acntuid */
        acntUid?: string;
        /** Botclsuid */
        botClsUid?: string;
        /** Itemuid */
        itemUid?: string;
        /** Limit */
        limit?: number;
        /** Skip */
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKnowledgeGetResp, HTTPValidationError>({
        path: `/api/v1/knlg/items/${uid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bot
     * @name GetItemsApiV1BotItemsGet
     * @summary Get Items
     * @request GET:/api/v1/bot/items
     */
    getItemsApiV1BotItemsGet: (
      query: {
        /** Acntuid */
        acntUid: string;
        /** Wsuid */
        wsUid: string;
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/bot/items`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bot
     * @name CreateBotApiV1BotItemsPost
     * @summary Create Bot
     * @request POST:/api/v1/bot/items
     */
    createBotApiV1BotItemsPost: (
      data: BotCreateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/bot/items`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bot
     * @name GetItemsApiV1BotItemsBotClsUidGet
     * @summary Get Items
     * @request GET:/api/v1/bot/items/{botClsUid}
     */
    getItemsApiV1BotItemsBotClsUidGet: (
      botClsUid: string,
      query: {
        /** Acntuid */
        acntUid: string;
        /** Wsuid */
        wsUid: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/bot/items/${botClsUid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete botClsUid and all botInstUid
     *
     * @tags Bot
     * @name DeleteClsApiV1BotItemsBotClsUidDelete
     * @summary Delete Cls
     * @request DELETE:/api/v1/bot/items/{botClsUid}
     */
    deleteClsApiV1BotItemsBotClsUidDelete: (
      botClsUid: string,
      data: BotDeleteReq,
      query?: {
        /** Botinstuid */
        botInstUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/bot/items/${botClsUid}`,
        method: "DELETE",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description deleteProps is not supported.
     *
     * @tags Bot
     * @name UpdateClsApiV1BotItemsBotClsUidPatch
     * @summary Update Cls
     * @request PATCH:/api/v1/bot/items/{botClsUid}
     */
    updateClsApiV1BotItemsBotClsUidPatch: (
      botClsUid: string,
      data: BotUpdateReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/bot/items/${botClsUid}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete botInstUid
     *
     * @tags Bot
     * @name DeleteClsApiV1BotItemsBotClsUidBotInstUidDelete
     * @summary Delete Cls
     * @request DELETE:/api/v1/bot/items/{botClsUid}/{botInstUid}
     */
    deleteClsApiV1BotItemsBotClsUidBotInstUidDelete: (
      botClsUid: string,
      botInstUid: string,
      data: BotDeleteReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/bot/items/${botClsUid}/${botInstUid}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat
     * @name PostMessagesApiV1ChatMessagesPost
     * @summary Post Messages
     * @request POST:/api/v1/chat/messages
     */
    postMessagesApiV1ChatMessagesPost: (
      data: ChatReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespChatRespData, HTTPValidationError>({
        path: `/api/v1/chat/messages`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Startup-Package
     * @name UploadFilesForChatbotApiV1StartupPackageUploadFilesPost
     * @summary Upload Files For Chatbot
     * @request POST:/api/v1/startup-package/upload-files
     */
    uploadFilesForChatbotApiV1StartupPackageUploadFilesPost: (
      data: PrepareBpReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespPrepareBpResp, HTTPValidationError>({
        path: `/api/v1/startup-package/upload-files`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Startup-Package
     * @name ChangpaeApiV1StartupPackageChangpaePost
     * @summary Changpae
     * @request POST:/api/v1/startup-package/changpae
     */
    changpaeApiV1StartupPackageChangpaePost: (
      data: StartupPackageReqData,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/startup-package/changpae`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description From scraping to chatbot update all at once for sales automation.
     *
     * @tags Smart
     * @name SalesAutomationApiV1SmartSalesAutomationBotClsUidPatch
     * @summary Sales Automation
     * @request PATCH:/api/v1/smart/sales-automation/{botClsUid}
     */
    salesAutomationApiV1SmartSalesAutomationBotClsUidPatch: (
      botClsUid: string,
      data: SmartReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/smart/sales-automation/${botClsUid}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description From scraping to chatbot creation all at once for sales automation.
     *
     * @tags Smart
     * @name SalesAutomationApiV1SmartSalesAutomationPost
     * @summary Sales Automation
     * @request POST:/api/v1/smart/sales-automation
     */
    salesAutomationApiV1SmartSalesAutomationPost: (
      data: SmartReq,
      query?: {
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/smart/sales-automation`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description From scraping to chatbot update all at once.
     *
     * @tags Smart
     * @name ChatbotApiV1SmartChatbotBotClsUidPatch
     * @summary Chatbot
     * @request PATCH:/api/v1/smart/chatbot/{botClsUid}
     */
    chatbotApiV1SmartChatbotBotClsUidPatch: (
      botClsUid: string,
      data: SmartReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/smart/chatbot/${botClsUid}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description From scraping to chatbot creation all at once.
     *
     * @tags Smart
     * @name ChatbotApiV1SmartChatbotPost
     * @summary Chatbot
     * @request POST:/api/v1/smart/chatbot
     */
    chatbotApiV1SmartChatbotPost: (
      data: SmartReq,
      query?: {
        /** Botclsuid */
        botClsUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespBotCreateResp, HTTPValidationError>({
        path: `/api/v1/smart/chatbot`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Generate gcp signed url for file upload
     *
     * @tags Faq
     * @name GenerateUploadUrlApiV1FaqGenerateUploadUrlPost
     * @summary Generate Upload Url
     * @request POST:/api/v1/faq/generate-upload-url
     */
    generateUploadUrlApiV1FaqGenerateUploadUrlPost: (
      data: StoreFilesReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespGenerateUrlsResp, HTTPValidationError>({
        path: `/api/v1/faq/generate-upload-url`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description find question and answer pairing nodes
     *
     * @tags Faq
     * @name GetNodesApiV1FaqNodesGet
     * @summary Get Nodes
     * @request GET:/api/v1/faq/nodes
     */
    getNodesApiV1FaqNodesGet: (
      query?: {
        /** Qa Node Uid */
        qa_node_uid?: string;
        /** Bot Class Uid */
        bot_class_uid?: string;
        /** Workspace Uid */
        workspace_uid?: string;
        /**
         * Activated Only
         * @default false
         */
        activated_only?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<QaResponse, HTTPValidationError>({
        path: `/api/v1/faq/nodes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description create question and answer pairing nodes. it can be created from excel file or WEB UI.
     *
     * @tags Faq
     * @name CreateQaNodesApiV1FaqNodesPost
     * @summary Create Qa Nodes
     * @request POST:/api/v1/faq/nodes
     */
    createQaNodesApiV1FaqNodesPost: (
      data: BodyCreateQaNodesApiV1FaqNodesPost,
      params: RequestParams = {},
    ) =>
      this.request<QaResponse, HTTPValidationError>({
        path: `/api/v1/faq/nodes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description delete question and a answer pairing nodes
     *
     * @tags Faq
     * @name DeleteNodeApiV1FaqNodesDelete
     * @summary Delete Node
     * @request DELETE:/api/v1/faq/nodes
     */
    deleteNodeApiV1FaqNodesDelete: (
      data: QaRequest,
      params: RequestParams = {},
    ) =>
      this.request<QaResponse, HTTPValidationError>({
        path: `/api/v1/faq/nodes`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description update question and answer pairing nodes
     *
     * @tags Faq
     * @name UpdateNodeApiV1FaqNodesPatch
     * @summary Update Node
     * @request PATCH:/api/v1/faq/nodes
     */
    updateNodeApiV1FaqNodesPatch: (
      data: QaRequest,
      params: RequestParams = {},
    ) =>
      this.request<QaResponse, HTTPValidationError>({
        path: `/api/v1/faq/nodes`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  ext = {
    /**
     * @description When echo event is called but depends on the event it will have different JSON structure https://github.com/hwonyo/naver_talk_sdk/blob/master/tests/api/test_webhook_handler.py look at the test cases for different events { 'event': 'echo', 'echoedEvent': 'send', 'user': 'test_user_id', 'partner': 'testyo', 'imageContent': { 'imageUrl': 'https://example_image.png' }, 'textContent':{ 'text':'text_from_test' }, 'compositeContent': { 'compositeList':[] }, 'options': { 'mobile': False } }
     *
     * @tags Ext_Chat
     * @name NavertalkWebhookExtV1ChatNavertalktalkExternalServiceIdPost
     * @summary Navertalk Webhook
     * @request POST:/ext/v1/chat/navertalktalk/{external_service_id}
     */
    navertalkWebhookExtV1ChatNavertalktalkExternalServiceIdPost: (
      externalServiceId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/ext/v1/chat/navertalktalk/${externalServiceId}`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ext_Chat
     * @name PostMessagesExtV1ChatThreadsThreadUidMessagesPost
     * @summary Post Messages
     * @request POST:/ext/v1/chat/threads/{threadUid}/messages
     */
    postMessagesExtV1ChatThreadsThreadUidMessagesPost: (
      threadUid: string,
      data: ExtChatReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespExtChatRespData, HTTPValidationError>({
        path: `/ext/v1/chat/threads/${threadUid}/messages`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ext_Chat
     * @name PostMessagesExtV1ChatMessagesPost
     * @summary Post Messages
     * @request POST:/ext/v1/chat/messages
     */
    postMessagesExtV1ChatMessagesPost: (
      data: ExtChatReq,
      params: RequestParams = {},
    ) =>
      this.request<WebRespExtChatRespData, HTTPValidationError>({
        path: `/ext/v1/chat/messages`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 사용자 메시지 수신 및 발신, infobank가 호출하는 webhook api
     *
     * @tags Ext_Chat
     * @name PostKakaoMessageExtV1ChatKakaoMessagePost
     * @summary Post Kakao Message
     * @request POST:/ext/v1/chat/kakao/message
     */
    postKakaoMessageExtV1ChatKakaoMessagePost: (
      data: KakaoChatMessageReq,
      query?: {
        /** Threaduid */
        threadUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKakaoChatResp, HTTPValidationError>({
        path: `/ext/v1/chat/kakao/message`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 사용자 메타 정보 수신, infobank가 호출하는 webhook api
     *
     * @tags Ext_Chat
     * @name PostKakaoReferenceExtV1ChatKakaoReferencePost
     * @summary Post Kakao Reference
     * @request POST:/ext/v1/chat/kakao/reference
     */
    postKakaoReferenceExtV1ChatKakaoReferencePost: (
      data: KakaoChatReferenceReq,
      query?: {
        /** Threaduid */
        threadUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKakaoChatResp, HTTPValidationError>({
        path: `/ext/v1/chat/kakao/reference`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 사용자 세션 종료 정보 수신, infobank가 호출하는 webhook api
     *
     * @tags Ext_Chat
     * @name PostKakaoExpiredSessionExtV1ChatKakaoExpiredSessionPost
     * @summary Post Kakao Expired Session
     * @request POST:/ext/v1/chat/kakao/expired_session
     */
    postKakaoExpiredSessionExtV1ChatKakaoExpiredSessionPost: (
      data: KakaoChatExpiredSessionReq,
      query?: {
        /** Threaduid */
        threadUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKakaoChatResp, HTTPValidationError>({
        path: `/ext/v1/chat/kakao/expired_session`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 전송 요청 결과, infobank가 호출하는 webhook api
     *
     * @tags Ext_Chat
     * @name PostKakaoResultExtV1ChatKakaoResultPost
     * @summary Post Kakao Result
     * @request POST:/ext/v1/chat/kakao/result
     */
    postKakaoResultExtV1ChatKakaoResultPost: (
      data: KakaoChatResultReq,
      query?: {
        /** Threaduid */
        threadUid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebRespKakaoChatResp, HTTPValidationError>({
        path: `/ext/v1/chat/kakao/result`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
