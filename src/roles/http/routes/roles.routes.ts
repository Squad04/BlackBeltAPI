import { Router } from "express";
import { Request, Response } from "express";
import { RolesRepository } from "@roles/repositories/RolesRepository";

const rolesRouter = Router();
const rolesRepository = new RolesRepository();

rolesRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  const role = rolesRepository.create({ name });

  return res.status(201).json(role);
});

rolesRouter.get("/", (req: Request, res: Response) => {
  const roles = rolesRepository.findAll();

  return res.status(200).json(roles);
});

export { rolesRouter };
