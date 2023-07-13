import { JWT } from "@auth/core/jwt";
import "express";

declare module "express" {
  interface Response {
    locals: Partial<{
      token: JWT | null;
    }>;
  }
}
