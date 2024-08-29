export type RequiredGeneric<T> = T extends undefined ? never : T;

export type APIResponse<T> = {
  data?: RequiredGeneric<T> | null;
  meta?: APIResponseMeta | null;
};

/** RespMeta */
export type APIResponseMeta = {
  code?: number | null;
  errors?: APIResponseError[] | null;
};

export type APIResponseError = {
  code?: number | null;
  desc?: string | null;
  msg?: string | null;
};

export type APIValidationError = {
  detail?: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
};
