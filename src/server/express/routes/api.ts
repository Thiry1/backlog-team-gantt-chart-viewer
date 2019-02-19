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
