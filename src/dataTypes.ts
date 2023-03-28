import { require } from "./utils.ts";

export interface ReqParams {
  userId: number,
  site: string
}

export function parseReqParams(reqUrl: URL): ReqParams {
  const searchParams = reqUrl.searchParams;
  const userId = Number(reqUrl.searchParams.get("userId"));
  require(userId, `'userId' parameter is mandatory and must be a number; given params: ${searchParams}`);

  return {
    userId: Number(userId),
    site: searchParams.get("site") || "stackoverflow",
  };
}
