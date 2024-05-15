import { Router } from "express";
import { Request, Response } from "express";
import { createRolesController, listRolesController } from "@roles/useCases";

const rolesRouter = Router();

rolesRouter.post("/", (req: Request, res: Response): Response => {
  return createRolesController.handle(req, res);
});

rolesRouter.get("/", (req: Request, res: Response) => {
  return listRolesController.handle(req, res);
});

export { rolesRouter };
