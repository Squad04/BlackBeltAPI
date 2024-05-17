import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);

usersRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createUserController.handle(req, res, next);
});

export { usersRouter };
