declare const buildEnv: string;
/**
 * 実行環境がブラウザーであるか.
 */
export const isBrowser =
  typeof buildEnv !== "undefined" && buildEnv === "browser";
