import { Router } from "express";
import { Request, Response } from "express";
import { createRoleController } from "@roles/useCases/createRoles";
import { listRolesController } from "@roles/useCases/listRoles";

const rolesRouter = Router();

rolesRouter.post("/", (req: Request, res: Response): Response => {
  return createRoleController.handle(req, res);
});

rolesRouter.get("/", (req: Request, res: Response) => {
  return listRolesController.handle(req, res);
});

export { rolesRouter };
