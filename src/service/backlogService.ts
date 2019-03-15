import axios from "axios";
import { BacklogApiClient } from "../client/backlog/backlogApiClient";
import {
  Group,
  Issue,
  IssuesApiRequestParams,
  SpaceApiResponse,
} from "../client/backlog/types";

export class BacklogService {
  private client: BacklogApiClient;
  constructor(args: { apiBaseUrl: string; apiKey?: string }) {
    this.client = new BacklogApiClient(
      axios.create({
        baseURL: args.apiBaseUrl,
      }),
      args.apiKey,
    );
  }

  public fetchGroups = async (): Promise<Group[]> => {
    return this.client.fetchGroups();
  };

  public fetchIssues = async (
    params: IssuesApiRequestParams,
  ): Promise<Issue[]> => {
    return this.client.fetchIssues(params);
  };

  public fetchSpace = async (): Promise<SpaceApiResponse> => {
    return this.client.fetchSpace();
  };
}
