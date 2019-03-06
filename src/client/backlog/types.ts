type TODO = any;
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

export interface Issue {
  /**
   * 課題の ID.
   */
  id: number;
  /**
   * プロジェクトの ID.
   */
  projectId: number;
  /**
   * 課題のキー.
   * @example "BLG-1"
   */
  issueKey: string;
  /**
   * 課題のタイプ.
   */
  issueType: {
    id: number;
    projectId: number;
    name: string;
    color: string;
    displayOrder: number;
  };
  /**
   * サマリー.
   */
  summary: string;
  /**
   * 説明.
   */
  description: string;
  /**
   * 謎/
   */
  resolutions: TODO;
  /**
   * 重要度.
   */
  priority: {
    id: string | null;
    /**
     * @example "中"
     */
    name: string;
  };
  /**
   * 課題のステータス.
   */
  status: {
    /**
     * @example "In Progress"
     */
    name: string;
    id: number;
  };
  /**
   * 課題の assignee.
   */
  assignee: {
    id: number;
    name: string;
    roleType: number;
    lang: string | null;
    mailAddress: string;
  };
  /**
   * カテゴリー.
   */
  category: any[];
  /**
   * バージョン.
   */
  versions: any[];
  /**
   * マイルストーン.
   */
  milestone: any[];
  /**
   * 開始日時.
   */
  startDate: string | null;
  /**
   * 期日.
   */
  dueDate: string | null;
  /**
   * 予定時間.
   */
  estimatedHours: string | null;
  /**
   * 実績時間.
   */
  actualHours: string | null;
}

/**
 * 課題一覧取得 API のレスポンス.
 * @see https://developer.nulab-inc.com/ja/docs/backlog/api/2/get-issue-list/
 */
export type IssueApiResponse = Issue[];
