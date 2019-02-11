import * as express from "express";
export const pageRouter = express.Router();

pageRouter.get("/", (req: express.Request, res: express.Response) => {
  res.render("index.ejs");
});
