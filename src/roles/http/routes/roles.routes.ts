import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRoleController } from "@roles/useCases/createRoles/CreateRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";
import { ShowRoleController } from "@roles/useCases/showRole/ShowRoleController";
import { UpdateRoleController } from "@roles/useCases/updateRole/UpdateRoleController";
import { DeleteRoleController } from "@roles/useCases/deleteRole/DeleteRoleController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { isAdmin } from "@shared/http/middlewares/isAdmin";
import {
  createRoleSchema,
  showRoleSchema,
  updateRoleSchema,
} from "./schemas/validationSchema";

const rolesRouter = Router();
const createRoleController = container.resolve(CreateRoleController);
const listRolesController = container.resolve(ListRolesController);
const showRoleController = container.resolve(ShowRoleController);
const updateRoleController = container.resolve(UpdateRoleController);
const deleteRoleController = container.resolve(DeleteRoleController);

rolesRouter.use(isAuthenticated);
rolesRouter.use(isAdmin);

rolesRouter.post(
  "/",
  createRoleSchema,
  (req: Request, res: Response, next: NextFunction) => {
    createRoleController.handle(req, res, next);
  },
);

rolesRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  listRolesController.handle(req, res, next);
});

rolesRouter.get(
  "/:id",
  showRoleSchema,
  (req: Request, res: Response, next: NextFunction) => {
    showRoleController.handle(req, res, next);
  },
);

rolesRouter.put(
  "/:id",
  updateRoleSchema,
  (req: Request, res: Response, next: NextFunction) =>
    updateRoleController.handle(req, res, next),
);

rolesRouter.delete(
  "/:id",
  showRoleSchema,
  (req: Request, res: Response, next: NextFunction) =>
    deleteRoleController.handle(req, res, next),
);

export { rolesRouter };
