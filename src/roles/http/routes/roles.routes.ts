import { Router } from "express";
import { Request, Response } from "express";
import { CreateRoleController } from "@roles/useCases/createRole/CreateRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";

const rolesRouter = Router();
const createRolesController = new CreateRoleController();
const listRolesController = new ListRolesController();

rolesRouter.post("/", (req: Request, res: Response): Response => {
  return createRolesController.handle(req, res);
});

rolesRouter.get("/", (req: Request, res: Response) => {
  return listRolesController.handle(req, res);
});

export { rolesRouter };
