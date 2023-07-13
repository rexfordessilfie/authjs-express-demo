import { Response, Router } from "express";
import { authenticatedUser } from "../middleware/index.js";

const router = Router();

router.get("/me", authenticatedUser, async (_req, res: Response) => {
  res.send(
    `
  <h1>Profile</h1>
  <pre>${JSON.stringify(res.locals.token, null, 2)}</pre>
  <a href="/">Home</a>
`
  );
});

export { router as usersRouter };
