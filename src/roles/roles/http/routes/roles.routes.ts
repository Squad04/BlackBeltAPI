import { Router } from "express";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// Provisório antes de adicinar o banco

const roles = [];

const rolesRouter = Router();

rolesRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  const role = {
    id: uuidv4(),
    name,
    created_at: new Date(),
  };

  roles.push(role);

  return res.status(201).json(role);
});

export { rolesRouter };
