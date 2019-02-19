import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Group, GroupsApiResponse } from "./types";

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
    try {
      const response: AxiosResponse<GroupsApiResponse> = await this.axios.get(
        `/groups`,
        {
          params: {
            apiKey: this.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log("ERROR", (error as AxiosError).code);
      // TODO: implement
      throw error;
    }
  };
}
