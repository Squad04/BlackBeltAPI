import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";
import { container } from "tsyringe";
import { CreateRoleController } from "@roles/useCases/createRoles/CreateRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";

const rolesRouter = Router();
const createRoleController = container.resolve(CreateRoleController);
const listRolesController = container.resolve(ListRolesController);

rolesRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    createRoleController.handle(req, res, next);
  }),
);

rolesRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    listRolesController.handle(req, res, next);
  }),
);

export { rolesRouter };
