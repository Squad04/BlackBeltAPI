import { Router } from "express";
import { Request, Response } from "express";
import { rolesRouter } from "@roles/http/routes/roles.routes";
import { usersRouter } from "@users/http/routes/users.routes";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello, world!" });
});

routes.use("/roles", rolesRouter);

routes.use("/users", usersRouter);

export { routes };
