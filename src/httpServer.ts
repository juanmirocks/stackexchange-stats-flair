import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

export class HttpError extends Error {
  override name = "HttpError";
  httpStatus: number;

  constructor(httpStatus: number, message: string) {
    super(message);
    this.httpStatus = httpStatus;
  }

  asResponse(): Response {
    return new Response(this.message, {
      status: this.httpStatus
    });
  }
}

/**
 * scala-like function to test for valid inputs.
 *
 * if !expr, an `HttpError` is thrown, which contains a valid http status response.
 */
export function require(expr: unknown, msg = ""): void {
  if (!expr) {
    throw new HttpError(400, msg);
  }
}

const handler = async (req: Request): Promise<Response> => {
  try {
    const reqUrl = new URL(req.url);

    const userId = reqUrl.searchParams.get("userId");
    require(userId, "`userId` parameter is mandatory");
    const site = reqUrl.searchParams.get("site") || "stackoverflow";
    const targetUrl = `https://api.stackexchange.com/2.3/users/${userId}?site=${site}`;
    const resp = await fetch(targetUrl, {
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
  }
  catch (error) {
    if (error instanceof HttpError) {
      return error.asResponse();
    } else {
      throw error;
    }
  }
};

serve(handler);