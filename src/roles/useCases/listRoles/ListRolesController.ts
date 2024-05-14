import { RolesRepository } from "@roles/repositories/RolesRepository";
import { Request, Response } from "express";

export class ListRolesController {
  constructor() {}

  handle(req: Request, res: Response): Response {
    const rolesRepository = new RolesRepository();
    const roles = rolesRepository.findAll();

    return res.status(200).json(roles);
  }
}
