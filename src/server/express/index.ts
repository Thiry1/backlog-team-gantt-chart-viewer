import * as express from "express";
import * as path from "path";
import { serverConfig } from "../../config/server/serverConfig";
import { apiRouter } from "./routes/api";
import { pageRouter } from "./routes/pages";
const expressBasicAuth = require("basic-auth-connect");

export const initializeExpress = () => {
  const app = express();

  app.set("view engine", "ejs");

  if (serverConfig.basicAuth.enabled) {
    app.use(
      expressBasicAuth(
        serverConfig.basicAuth.id,
        serverConfig.basicAuth.password,
      ),
    );
  }

  app.use(pageRouter);
  app.use(apiRouter);

  app.use("/dist", express.static(path.join(__dirname, "../../../dist")));

  app.listen(3000);
};
