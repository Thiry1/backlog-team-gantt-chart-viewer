import { clientConfig } from "../../config/client/clientConfig";
import { BacklogService } from "../backlogService";
export const backlogService = new BacklogService({
  apiBaseUrl: `${clientConfig.host}/api`,
});
