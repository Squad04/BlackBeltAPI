import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRolesUseCase } from "./createRoles/CreateRolesUseCase";
import { CreateRolesController } from "./createRoles/CreateRolesController";

const rolesRepository = new RolesRepository();
const createRolesUseCase = new CreateRolesUseCase(rolesRepository);
export const createRolesController = new CreateRolesController(
  createRolesUseCase,
);
