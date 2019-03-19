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
  /**
   * ベーシック認証設定.
   */
  basicAuth: {
    /**
     * 認証を有効にするか.
     */
    enabled: boolean;
    /**
     * ベーシック認証の ID.
     */
    id: string;
    /**
     * ベーシック認証のパスワード.
     */
    password: string;
  };
}

export const serverConfig: ServerConfig = require("config"); // サーバーサイドでは全てのコンフィグを読み込んでも良い.
