export interface ClientConfig {
  application: {
    /**
     * アプリケーションのベース URL.
     * ブラウザサイドでの API エンドポイントとして使う.
     */
    baseUrl: string;
  };
}

export const serverConfig: ClientConfig = {
  application: require("config").get("application")
};
