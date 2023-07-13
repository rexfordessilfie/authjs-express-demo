import { Router } from "express";
import { httpApiAdapters } from "../utils/index.js";
import { Auth } from "@auth/core";
import { getAuthConfig } from "../config/index.js";

const router = Router();

router.use("/*", async (req, res) => {
  const request = httpApiAdapters.request.fromExpressToFetch(req);
  const response = await Auth(request, getAuthConfig(req));
  await httpApiAdapters.response.fromFetchToExpress(response, res);
});

export { router as authRouter };
