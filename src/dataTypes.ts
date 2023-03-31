import { THEMES } from "./themes.ts";
import { require } from "./utils.ts";

/**
 * Parsed request query parameters as a well-defined object.
 *
 * Note: we exceptionally use snake_case to match the style of StackExchange APIs.
 */
export interface ReqParams {
  user_id: number,
  site: string,
  theme: string
}


function getTransformCheck(searchParams: URLSearchParams, key: string, transform: (value: string | null) => any, check: (value: any) => void, defValue: any = null): any {
  const valStr = searchParams.get(key);

  if (valStr === null && defValue !== null) {
    return defValue;
  }
  else {
    const val = transform(valStr);
    check(val);
    return val;
  }
}


export function parseReqParams(reqUrl: URL): ReqParams {
  const searchParams = reqUrl.searchParams;

  //Stack Exchange Parameters
  const user_id = getTransformCheck(searchParams, "user_id",
    val => Number(val),
    val => require(val, `'user_id' query parameter is mandatory and must be a number; given params: ${searchParams}`)
  ) as number;

  //Own Parameters
  const theme = getTransformCheck(searchParams, "theme",
    val => val,
    val => require((Object.hasOwn(THEMES, val)), `Given 'theme' (${val}) is not recognized; available themes: ${Object.keys(THEMES)}`),
    "classic_flair_default"
  ) as string;

  return {
    user_id: user_id,
    site: searchParams.get("site") || "stackoverflow",
    theme: theme
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
