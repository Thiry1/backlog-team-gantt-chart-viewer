/**
 * ユーザー情報
 */
export interface User {
  /**
   * ユーザー の数値ID.
   */
  id: number;
  /**
   * ユーザー ID.
   */
  userId: string;
  /**
   * ユーザー名.
   */
  name: string;
  /**
   * ロールタイプ.
   */
  roleType: number;
  /**
   * 言語.
   */
  lang: string | null;
  /**
   * メールアドレス.
   */
  mailAddress: string;
}
export interface Group {
  /**
   * グループの ID.
   */
  id: number;
  /**
   * グループ名.
   */
  name: string;
  /**
   * グループのメンバー.
   */
  members: User[];
  /**
   * 表示順.
   */
  displayOrder: number | null;
  /**
   * グループ作成者.
   */
  createdUser: User;
  /**
   * 作成日.
   * @example "2019-02-06T06:20:28Z"
   */
  created: string;
  /**
   * 最終更新ユーザー.
   */
  updateUser: User;
  /**
   * 最終更新日.
   * @example "2019-02-06T06:20:28Z"
   */
  updated: string;
}
/**
 * グループ一覧取得 API のレスポンス.
 * @see https://developer.nulab-inc.com/ja/docs/backlog/api/2/get-list-of-groups/
 */
export type GroupsApiResponse = Group[];
