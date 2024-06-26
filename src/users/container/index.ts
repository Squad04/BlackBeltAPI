import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { SendForgotPasswordMailController } from "@users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";
import { UpdateProfileController } from "@users/useCases/updateProfile/UpdateProfileController";
import { ResetPasswordController } from "@users/useCases/resetPassword/ResetPasswordController";
import { ITokensRepository } from "@tokens/repositories/ITokensRepository";
import { TokensRepository } from "@tokens/repositories/TokensRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<ITokensRepository>(
  "TokensRepository",
  TokensRepository,
);

container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("ListUsersController", ListUsersController);
container.registerSingleton("CreateLoginController", CreateLoginController);
container.registerSingleton("ShowProfileController", ShowProfileController);
container.registerSingleton("UpdateProfileController", UpdateProfileController);
container.registerSingleton(
  "SendForgotPasswordMailController",
  SendForgotPasswordMailController,
);
container.registerSingleton("ResetPasswordController", ResetPasswordController);
