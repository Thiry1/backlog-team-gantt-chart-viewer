import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import * as qs from "query-string";
import {
  Group,
  GroupsApiResponse,
  Issue,
  IssuesApiRequestParams,
  IssuesApiResponse,
  SpaceApiResponse,
} from "./types";
/**
 * backlog の API クライアント
 */
export class BacklogApiClient {
  constructor(private axios: AxiosInstance, private apiKey?: string) {}

  /**
   * グループ一覧を取得する.
   * @see https://developer.nulab-inc.com/ja/docs/backlog/api/2/get-list-of-groups/
   */
  public fetchGroups = async (): Promise<Group[]> => {
    return this.fetch(
      async (): Promise<Group[]> => {
        const response: AxiosResponse<GroupsApiResponse> = await this.axios.get(
          `/groups`,
          {
            params: {
              apiKey: this.apiKey,
            },
          },
        );
        return response.data;
      },
    );
  };

  /**
   * 課題一覧を取得する.
   * @param fetchIssuesParams
   */
  public fetchIssues = async (
    fetchIssuesParams: IssuesApiRequestParams,
  ): Promise<Issue[]> => {
    return this.fetch(
      async (): Promise<Issue[]> => {
        const response: AxiosResponse<IssuesApiResponse> = await this.axios.get(
          `/issues`,
          {
            params: {
              apiKey: this.apiKey,
              ...fetchIssuesParams,
            },
            paramsSerializer: (params: IssuesApiRequestParams) =>
              qs.stringify(params, { arrayFormat: "bracket" }),
          },
        );
        return response.data;
      },
    );
  };

  /**
   * スペース情報を取得する.
   */
  public fetchSpace = async (): Promise<SpaceApiResponse> => {
    return this.fetch(
      async (): Promise<SpaceApiResponse> => {
        const response: AxiosResponse<SpaceApiResponse> = await this.axios.get(
          `/space`,
          {
            params: {
              apiKey: this.apiKey,
            },
          },
        );
        return response.data;
      },
    );
  };

  private fetch = async <T>(fetchFunction: () => Promise<T>): Promise<T> => {
    try {
      return fetchFunction();
    } catch (error) {
      console.log("ERROR", (error as AxiosError).code);
      // TODO: implement
      throw error;
    }
  };
}
