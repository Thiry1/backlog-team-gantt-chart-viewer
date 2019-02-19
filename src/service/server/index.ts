import { serverConfig } from "../../config/server/serverConfig";
import { BacklogService } from "../backlogService";

export const backlogService = new BacklogService({
  apiBaseUrl: `${serverConfig.backlog.apiBaseUrl}/api/v2`,
  apiKey: serverConfig.backlog.apiKey,
});
