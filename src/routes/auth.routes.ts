import { Request, Response, Router } from "express";
import { httpApiAdapters } from "../utils/index.js";
import { Auth } from "@auth/core";
import { getAuthConfig } from "../config/authjs.config.js";

const router = Router();

router.use("/*", async (req: Request, res: Response) => {
  const request = httpApiAdapters.request.fromExpressToFetch(req);
  const response = await Auth(request, getAuthConfig());
  httpApiAdapters.response.fromFetchToExpress(response, res);
});

export { router as authRouter };
