// Copyright 2023 Dr. Juan Miguel Cejuela
// SPDX-License-Identifier: Apache-2.0

import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { handleError } from "./utils.ts";
import * as seAPIs from "./fetch.ts";
import * as designs from "./designs.ts";
import { DummyCache, parseReqParams } from "./dataTypes.ts";


const _CACHE =
  (typeof caches === 'undefined')
    // Use dummy cache (does nothing) if the Cache API is not available
    ? new DummyCache()
    : await caches.open("MAIN_v01");


async function handler(req: Request): Promise<Response> {
  const reqUrl = new URL(req.url);

  //Minimal routing for testing and avoiding hitting the SE APIs too many times
  const isTesting = reqUrl.pathname.startsWith("/test_offline");
  const seFetchData = (isTesting)
    ? seAPIs.fetchSeUserDataTest
    : seAPIs.fetchSeUserData;

  const cachedResponse = (isTesting) ? undefined : (await _CACHE.match(req));
  if (cachedResponse) {
    console.log(`Responding (${cachedResponse.status}) from cache: ${reqUrl}`)
    cachedResponse.headers.set("x-cache-hit", "true");
    return cachedResponse;
  }

  return (async () => await Promise.resolve(parseReqParams(reqUrl)))()
    .then((params) =>
      seFetchData(params).then((seUserPayload) => [params, seUserPayload])
    )
    .then(([params, seUserPayload]) => designs.drawClassicFlair(params, seUserPayload))
    .then(svg => {
      const ret = new Response(svg, {
        status: 200,
        headers: {
          //see: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started#a_word_on_web_servers_for_.svgz_files
          "Content-Type": "image/svg+xml",
          "Vary": "Accept-Encoding",
        },
      });

      //Put response's close into cache asynchronously (though don't wait for it)
      if (!isTesting) {
        _CACHE.put(req, ret.clone());
      }

      return ret;
    })
    .catch(handleError);
}

serve(handler);
