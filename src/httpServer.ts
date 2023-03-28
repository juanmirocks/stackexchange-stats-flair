import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { require, handleError } from "./utils.ts";
import * as seAPIs from "./seAPIs.ts";
import * as designs from "./designs.ts";

export function parseReqParams(reqUrl: URL): any {
  const userId = reqUrl.searchParams.get("userId");
  require(userId, "`userId` parameter is mandatory");

  return {
    userId: userId,
    site: reqUrl.searchParams.get("site") || "stackoverflow",
  };
}

const handler = (req: Request): Promise<Response> => {
  const reqUrl = new URL(req.url);

  //Minimal routing for testing and avoiding hitting the SE APIs too many times
  const seFetchData = (reqUrl.pathname === "/test_offline") ? seAPIs.fetchDataTest : seAPIs.fetchData;

  return Promise.resolve(parseReqParams(reqUrl))
    .then(params => seFetchData(params))
    .then(seUserPayload => {
      const retSvg = designs.flair(seUserPayload);

      return new Response(retSvg, {
        status: 200,
        headers: {
          //see: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started#a_word_on_web_servers_for_.svgz_files
          "Content-Type": "image/svg+xml",
          "Vary": "Accept-Encoding"
        }
      });
    })
    .catch(handleError)
};

serve(handler);
