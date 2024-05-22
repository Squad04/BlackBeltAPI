import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { isAdmin } from "@shared/http/middlewares/isAdmin";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";
import { UpdateProfileController } from "@users/useCases/updateProfile/UpdateProfileController";
import { NextFunction, Request, Response, Router } from "express";
import { SendForgotPasswordMailController } from "@users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ResetPasswordController } from "@users/useCases/resetPassword/ResetPasswordController";
import { container } from "tsyringe";
import {
  createUserSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  updateUserSchema,
} from "./schemas/validationSchema";

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const showProfileController = container.resolve(ShowProfileController);
const updateProfileController = container.resolve(UpdateProfileController);
const sendForgotPasswordMailController = container.resolve(
  SendForgotPasswordMailController,
);
const resetPasswordController = container.resolve(ResetPasswordController);

usersRouter.post(
  "/",
  createUserSchema,
  (req: Request, res: Response, next: NextFunction) => {
    createUserController.handle(req, res, next);
  },
);

usersRouter.get(
  "/",
  isAuthenticated,
  isAdmin,
  (req: Request, res: Response, next: NextFunction) => {
    listUsersController.handle(req, res, next);
  },
);

usersRouter.post(
  "/login",
  loginSchema,
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
  updateUserSchema,
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    updateProfileController.handle(req, res, next);
  },
);

// Forgot & Reset Password routes

usersRouter.post(
  "/forgot-password",
  forgotPasswordSchema,
  (req: Request, res: Response, next: NextFunction) =>
    sendForgotPasswordMailController.handle(req, res, next),
);

usersRouter.post(
  "/reset-password",
  resetPasswordSchema,
  (req: Request, res: Response, next: NextFunction) => {
    resetPasswordController.handle(req, res, next);
  },
);

export { usersRouter };
