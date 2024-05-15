import { Router } from "express";
import { Request, Response } from "express";
import { createRolesController } from "@roles/useCases";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";

const rolesRouter = Router();
const listRolesController = new ListRolesController();

rolesRouter.post("/", (req: Request, res: Response): Response => {
  return createRolesController.handle(req, res);
});

rolesRouter.get("/", (req: Request, res: Response) => {
  return listRolesController.handle(req, res);
});

export { rolesRouter };
