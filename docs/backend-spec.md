# Cocopua バックエンド設計書（WordPress）

最終更新: 2026-04-29

## 1. 目的

- WordPress管理画面でコンテンツ運用を完結する。
- React公開サイトへREST APIで安定配信する。
- フロントエンドと独立して運用可能な構成にする。

## 2. 基本構成

- CMS: WordPress 6.0+
- Runtime: PHP 8.1+
- DB: MySQL 8.4 LTS
- 配信: WordPress REST API

## 3. 管理対象データ

### 3.1 News（CPT）

- 投稿種別: `news`
- 必須項目: title, content, status, date, modified
- 公開制御: publish/draft

### 3.2 Topページコンテンツ

- 固定ページ + カスタムフィールドで管理
- 画像はメディアライブラリで管理

## 4. API設計

### 4.1 News API

- 一覧: `GET /wp-json/wp/v2/news?status=publish&per_page=10&orderby=date&order=desc`
- 詳細: `GET /wp-json/wp/v2/news/{id}`

### 4.2 TopページAPI

MVPは固定ページを利用してREST公開する。

- 候補1: 固定ページ + REST公開カスタムフィールド
- 候補2: 専用API `GET /wp-json/cocopua/v1/top`

### 4.3 レスポンス変換方針

- WordPress標準レスポンスを保持
- フロント側で最小限の正規化を実施

## 5. 認証・認可

### 5.1 公開API

- 認証不要（公開データのみ）

### 5.2 管理操作

- WordPress認証に依存
- React側から管理APIは呼ばない

## 6. CORS とセキュリティ

### 6.1 CORS

- 許可Originを公開フロントドメインに限定
- 許可メソッド: GET, HEAD, OPTIONS

### 6.2 セキュリティ

- WordPress / PHP / プラグインを定期更新
- XML-RPCの必要性を確認し不要なら制限
- WAF/ログ監視を有効化

## 7. キャッシュ戦略

### 7.1 APIキャッシュ

- News一覧: `Cache-Control: public, max-age=3600`
- News詳細: `Cache-Control: public, max-age=1800`
- Topページ: `Cache-Control: public, max-age=900`

### 7.2 無効化

- News更新時に関連キャッシュをパージ
- Top更新時にTop関連キャッシュをパージ

## 8. エラーハンドリング

- 404: フロントはNotFound誘導
- 500: リトライ可能な文言を返す
- ネットワークエラー: フロント側で再試行UIを表示

## 9. 運用設計

### 9.1 権限

- Editor: News運用
- Administrator: 設定変更・プラグイン管理

### 9.2 運用手順

1. 下書き作成
2. レビュー
3. 公開
4. 公開後チェック（公開サイト反映確認）

## 10. 監視・保守

- 稼働監視: HTTP監視（5分間隔）
- API遅延監視: 95パーセンタイルで1秒以内
- バックアップ: DB日次、メディア週次

## 11. 受け入れ基準

- WordPress管理画面でNews運用が完結する
- React公開サイトからNews/Topデータを取得できる
- CORSが適切に制限されている
- API障害時に運用者が検知できる
