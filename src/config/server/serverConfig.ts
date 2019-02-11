export interface ServerConfig {
  backlog: {
    /**
     * API のベース URL.
     * @example http://example.backlog.com
     */
    apiBaseUrl: string;
    /**
     * API の認証キー.
     */
    apiKey: string;
  };
}

export const serverConfig: ServerConfig = require("config"); // サーバーサイドでは全てのコンフィグを読み込んでも良い.
