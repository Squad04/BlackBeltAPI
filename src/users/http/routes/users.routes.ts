import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";
import { UpdateProfileController } from "@users/useCases/updateProfile/UpdateProfileController";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const showProfileController = container.resolve(ShowProfileController);
const updateProfileController = container.resolve(UpdateProfileController);

usersRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createUserController.handle(req, res, next);
});

usersRouter.get(
  "/",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    listUsersController.handle(req, res, next);
  },
);

usersRouter.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    createLoginController.handle(req, res, next);
  },
);

// Profile route

usersRouter.get(
  "/profile",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    showProfileController.handle(req, res, next);
  },
);

usersRouter.put(
  "/profile",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    updateProfileController.handle(req, res, next);
  },
);

export { usersRouter };
