import * as express from "express";
import * as path from "path";
import { apiRouter } from "./routes/api";
import { pageRouter } from "./routes/pages";

export const initializeExpress = () => {
  const app = express();

  app.set("view engine", "ejs");

  app.use(pageRouter);
  app.use(apiRouter);

  app.use("/dist", express.static(path.join(__dirname, "../../../dist")));

  app.listen(3000);
};
