import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);

usersRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createUserController.handle(req, res, next);
});

usersRouter.get("/", (req, res, next) => {
  listUsersController.handle(req, res, next);
});

export { usersRouter };
