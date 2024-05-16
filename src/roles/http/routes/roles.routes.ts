import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { createRoleController } from "@roles/useCases/createRoles";
import { listRolesController } from "@roles/useCases/listRoles";
import { asyncHandler } from "@shared/errors/AsyncErrorHandler";

const rolesRouter = Router();

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
