import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRolesUseCase } from "./CreateRolesUseCase";
import { CreateRolesController } from "./CreateRolesController";

const rolesRepository = RolesRepository.getInstance();
const createRolesUseCase = new CreateRolesUseCase(rolesRepository);
export const createRolesController = new CreateRolesController(
  createRolesUseCase,
);
