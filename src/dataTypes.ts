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


/**
 * @category Cache API
 *
 * Dummy cache that does nothing.
 *
 * As of 2023-03-30, Deno Deploy does not support the Cache API; see https://deno.com/deploy/docs/runtime-api
 * In the absence of the global `caches` object, we use this empty cache to avoid errors such as "ReferenceError: caches is not defined".
 */
export class DummyCache implements Cache {
  async put(_request: RequestInfo | URL, _response: Response): Promise<void> {
    return undefined
  }
  async match(_request: RequestInfo | URL, _options?: CacheQueryOptions): Promise<Response | undefined> {
    return undefined;
  }
  async delete(_request: RequestInfo | URL, _options?: CacheQueryOptions): Promise<boolean> {
    return false;
  }
}
