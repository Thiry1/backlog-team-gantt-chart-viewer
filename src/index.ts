import { AxiosError } from "axios";
import { Group } from "./client/backlog/types";
import { backlogService } from "./service/server";

backlogService
  .fetchGroups()
  .then((groups: Group[]) => console.log("groups", groups))
  .catch((error: AxiosError) => console.error(error.message));
