import { getToken } from "@auth/core/jwt";
import { NextFunction, Request, Response } from "express";

/**
 * Ensures that the user is authenticated when accessing a route.
 * Populates `res.locals` with the decoded JWT token.
 *
 * The types for `req.locals` are found in `express.d.ts`
 */
export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = await getToken({
    // TODO: raise issue on how this doesn't actually accept a request object
    req: {
      cookies: req.cookies,
      headers: req.headers as Record<string, string>,
    },
    secret: process.env.AUTH_SECRET,
  });

  res.locals.token = token;

  if (token) {
    next();
  } else {
    res.status(403).send("Unauthorized");
  }
}
