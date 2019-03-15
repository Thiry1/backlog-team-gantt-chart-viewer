import * as express from "express";
import { backlogService } from "../../../service/server";
export const apiRouter = express.Router();

apiRouter.get(
  "/api/groups",
  async (req: express.Request, res: express.Response) => {
    try {
      res.json(await backlogService.fetchGroups());
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
);

apiRouter.get(
  "/api/issues",
  async (req: express.Request, res: express.Response) => {
    try {
      res.json(await backlogService.fetchIssues(req.query));
    } catch (e) {
      res
        .status(500)
        .json({ message: e.message, params: req.params, query: req.query });
    }
  },
);

apiRouter.get(
  "/api/space",
  async (req: express.Request, res: express.Response) => {
    try {
      res.json(await backlogService.fetchSpace());
    } catch (e) {
      res
        .status(500)
        .json({ message: e.message, params: req.params, query: req.query });
    }
  },
);
