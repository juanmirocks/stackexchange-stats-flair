import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

const handler = async (_request: Request): Promise<Response> => {
  const userID = "341320";
  const site = "stackoverflow";
  const url = `https://api.stackexchange.com/2.3/users/${userID}?site=${site}`;
  const resp = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

serve(handler);