import "dotenv/config";
import "module-alias/register";
import "reflect-metadata";

import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
