export type JsonObject = { [key: string]: JsonValue };
export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | JsonObject;

// server action 직렬화를 위해 타입선언
export type CustomErrorType = {
  code: string;
  message: string;
  data?: JsonObject;
};

export class CustomError extends Error {
  code: string;
  message: string;
  data?: JsonObject;

  constructor(code: string, message: string, data?: JsonObject) {
    super(JSON.stringify({ code, message }));
    this.code = code;
    this.message = message;
    this.data = data ? data : undefined;

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toObject() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}

export const serializeError = (error: unknown): string => {
  if (error instanceof CustomError) {
    return JSON.stringify(error.toObject());
  } else if (error instanceof Error) {
    return JSON.stringify({ name: error.name, message: error.message });
  } else if (typeof error === "string") {
    return JSON.stringify({ message: error });
  } else if (typeof error === "number") {
    return JSON.stringify({ code: error, message: `Error code: ${error}` });
  } else {
    return JSON.stringify(error);
  }
};

export const parseError = (error: string) => {
  return new CustomError("INVALID_SERVER_ERROR", error);
};

export const toCustomError = (error: unknown) => {
  if (error instanceof CustomError) {
    return error;
  } else {
    return parseError(serializeError(error));
  }
};
