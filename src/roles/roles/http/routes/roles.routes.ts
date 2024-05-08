import { Role } from "@roles/roles/entities/Role";
import { Router } from "express";
import { Request, Response } from "express";

// Provisório antes de adicinar o banco

const roles: Role[] = [];

const rolesRouter = Router();

rolesRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  const role = new Role();

  Object.assign(role, {
    name,
    created_at: new Date(),
  });

  roles.push(role);

  return res.status(201).json(role);
});

export { rolesRouter };
