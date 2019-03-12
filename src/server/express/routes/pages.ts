import * as express from "express";
export const pageRouter = express.Router();

pageRouter.get(
  /^(?!.*(api|dist)\/).*$/,
  (req: express.Request, res: express.Response) => {
    res.render("index.ejs");
  },
);
