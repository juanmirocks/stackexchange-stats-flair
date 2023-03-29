import { require } from "./utils.ts";

/**
 * Parsed request query parameters as a well-defined object.
 *
 * Note: we exceptionally use snake_case to match the style of StackExchange APIs.
 */
export interface ReqParams {
  user_id: number,
  site: string
}

export function parseReqParams(reqUrl: URL): ReqParams {
  const searchParams = reqUrl.searchParams;
  const user_id = Number(reqUrl.searchParams.get("user_id"));
  require(user_id, `'user_id' query parameter is mandatory and must be a number; given params: ${searchParams}`);

  return {
    user_id: Number(user_id),
    site: searchParams.get("site") || "stackoverflow",
  };
}
