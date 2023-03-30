import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { handleError } from "./utils.ts";
import * as seAPIs from "./fetch.ts";
import * as designs from "./designs.ts";
import { parseReqParams } from "./dataTypes.ts";

async function handler(req: Request): Promise<Response> {
  const reqUrl = new URL(req.url);

  //Minimal routing for testing and avoiding hitting the SE APIs too many times
  const seFetchData = (reqUrl.pathname.startsWith("/test_offline"))
    ? seAPIs.fetchSeUserDataTest
    : seAPIs.fetchSeUserData;

  return (async () => await Promise.resolve(parseReqParams(reqUrl)))()
    .then((params) =>
      seFetchData(params).then((seUserPayload) => [params, seUserPayload])
    )
    .then(([params, seUserPayload]) => designs.drawClassicFlair(params, seUserPayload))
    .then(svg => {
      return new Response(svg, {
        status: 200,
        headers: {
          //see: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started#a_word_on_web_servers_for_.svgz_files
          "Content-Type": "image/svg+xml",
          "Vary": "Accept-Encoding",
        },
      });
    })
    .catch(handleError);
}

serve(handler);
