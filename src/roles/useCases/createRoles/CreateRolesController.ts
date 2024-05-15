import { Request, Response } from "express";
import { CreateRolesUseCase } from "./CreateRolesUseCase";

export class CreateRolesController {
  constructor(private createRolesUseCase: CreateRolesUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name } = req.body;

    const role = this.createRolesUseCase.execute(name);

    return res.status(201).json(role);
  }
}
