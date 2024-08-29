export type AccountCreateReq = {
  baseName: string;
  email?: string | null;
  fireAuthUid?: string | null;
};

export type AccountDto = {
  uid: string;
  lid?: string | null;
  fireAuthUid?: string | null;
  wsUid?: string | null;
  title?: string | null;
  baseName?: string | null;
  email?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

export type AccountResp = {
  item?: AccountDto | null;
};
