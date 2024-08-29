import type { APIResponse } from "../types/API";

/**
 *
 * @param pathname eg: https://api.docenty.ai
 * @param queryParams eg: // eg: /api/v1/smart/chatbot/asdf-asdf
 * @param method eg: ?acntUid=asdfasdf
 * @returns
 * @requires 제네릭 명시안하면 컴파일단계 에러
 */
export const ServerAPI = async <T>({
  pathname,
  queryParams,
  method,
  body,
}: {
  pathname: string;
  queryParams?: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: BodyInit | null;
}): Promise<T> => {
  try {
    const API_URL = process.env.NEXT_BACKEND_STUDIO_API_URL;
    const API_KEY = process.env.NEXT_BACKEND_API_PRIVATE_KEY;

    let fullUrl = `${API_URL}${pathname}`;

    if (queryParams) fullUrl += queryParams;

    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-DCT-V01-API-KEY": `${API_KEY}`,
      },
      body,
    });

    const { data, meta }: APIResponse<T> = await res.json();

    if (!res.ok) {
      const errorStrings = `${meta?.code}, ${meta?.errors?.reduce((acc, curr) => acc + curr.msg, "")}`;
      console.error(`ServerAPI: APIResponseError`, errorStrings);
      throw new Error(`ServerAPI: APIResponseError: ${errorStrings}`);
    }

    if (data === undefined || data === null) {
      console.error("API response data is null or undefined");
      throw new Error("API response data is null or undefined");
    }

    return data;
  } catch (err) {
    throw err;
  }
};
