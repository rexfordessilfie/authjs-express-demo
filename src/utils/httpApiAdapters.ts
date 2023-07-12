import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

function urlEncoded(obj: Record<string, any>) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    return `${acc ? `${acc}&` : ""}${encodeURIComponent(
      key
    )}=${encodeURIComponent(val as any)}`;
  }, "");
}

function jsonEncoded(obj: Record<string, any>) {
  return JSON.stringify(obj);
}

function encodeRequestBody(req: ExpressRequest) {
  const contentType = req.headers["content-type"];

  if (contentType?.includes("application/x-www-form-urlencoded")) {
    return urlEncoded(req.body);
  }

  if (contentType?.includes("application/json")) {
    return jsonEncoded(req.body);
  }

  return req.body;
}

export function adaptRequestFromExpressToFetch(req: ExpressRequest) {
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;

  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        v && headers.append(key, v);
      });
      return;
    }

    value && headers.append(key, value);
  });

  // GET and HEAD not allowed to receive body
  const body = /GET|HEAD/.test(req.method) ? undefined : encodeRequestBody(req);

  const request = new Request(url, {
    method: req.method,
    headers,
    body,
  });

  return request;
}

export async function adaptResponseFromFetchToExpress(
  response: Response,
  res: ExpressResponse
) {
  response.headers.forEach((value, key) => {
    if (value) {
      res.appendHeader(key, value);
    }
  });

  res.status(response.status);
  res.send(await response.text());
}

export const httpApiAdapters = {
  request: {
    fromExpressToFetch: adaptRequestFromExpressToFetch,
  },
  response: {
    fromFetchToExpress: adaptResponseFromFetchToExpress,
  },
};
