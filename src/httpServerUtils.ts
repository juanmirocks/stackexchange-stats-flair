export class HttpError extends Error {
  override name = "HttpError";
  httpStatus: number;

  constructor(httpStatus: number, message: string) {
    super(message);
    this.httpStatus = httpStatus;
  }

  asResponse(): Response {
    return new Response(this.message, {
      status: this.httpStatus,
    });
  }
}

/**
 * scala-like function to test for valid inputs.
 *
 * if !expr, an `HttpError` is thrown with 400 http status (Bad Request).
 */
export function require(expr: unknown, msg = ""): void {
  if (!expr) {
    throw new HttpError(400, msg);
  }
}

export function handleError(error: any): Response {
  if (error instanceof HttpError) {
    return error.asResponse();
  } else {
    return new Response(error, { status: 500 });
  }
}
