import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRolesUseCase } from "./createRoles/CreateRolesUseCase";
import { CreateRolesController } from "./createRoles/CreateRolesController";
import { ListRolesUseCase } from "./listRoles/ListRolesUseCase";
import { ListRolesController } from "./listRoles/ListRolesController";

const rolesRepository = new RolesRepository();
const createRolesUseCase = new CreateRolesUseCase(rolesRepository);
export const createRolesController = new CreateRolesController(
  createRolesUseCase,
);

const listRolesUseCase = new ListRolesUseCase(rolesRepository);
export const listRolesController = new ListRolesController(listRolesUseCase);
