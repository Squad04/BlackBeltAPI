import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleController } from "@roles/useCases/createRoles/CreateRoleController";
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController";
import { container } from "tsyringe";

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository,
);

container.registerSingleton("CreateRoleController", CreateRoleController);
container.registerSingleton("ListRolesController", ListRolesController);
