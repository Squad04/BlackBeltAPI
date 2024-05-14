import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";

export class CreateRoleController {
  constructor() {}

  handle(req: Request, res: Response): Response {
    const { name } = req.body;

    const rolesRepository = new RolesRepository();

    const roleAlreadyExists = rolesRepository.findByName(name);
    if (roleAlreadyExists) {
      throw new AppError("Role already exists");
    }

    const role = rolesRepository.create({ name });

    return res.status(201).json(role);
  }
}
