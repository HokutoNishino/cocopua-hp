# Cocopua HP 設計書

最終更新: 2026-04-29

## 1. 目的

- アイサロンの魅力を伝え、予約行動に迷いなく到達できるサイトを構築する。
- モバイルユーザー中心で、短時間で必要情報を得られる情報設計を行う。
- 高コストな独自開発を避け、運用しやすいMVPを先行リリースする。

## 2. スコープ

### 2.1 対象

- 公開サイト（サロン紹介）
- お知らせ機能（一覧・詳細）
- WordPress 管理画面でのお知らせ投稿・編集・削除・公開管理

### 2.2 対象外

- 独自予約システムの開発
- 会員登録・決済・ポイントなどEC機能
- 高度な分析ダッシュボード
- React 管理画面の開発（WordPress 管理画面に一本化）

## 3. 技術構成

### 3.1 全体構成

- **バックエンド**: WordPress（PHP）+ MySQL
- **フロントエンド**: React + TypeScript + Vite
- **通信**: REST API（WordPress REST API）

### 3.2 フロントエンド

- React 19
- TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router
- AxiosまたはFetch API（REST API クライアント）

### 3.3 バックエンド

- WordPress 6.0+
- PHP 8.1+
- MySQL 5.7+
- カスタム CPT（Custom Post Type）: News
- REST API 拡張

## 4. 画面設計

## 4.1 公開画面

- `/` Top
- `/menu` Menu
- `/gallery` Gallery
- `/staff` Staff
- `/access` Access
- `/faq` FAQ
- `/news` News一覧
- `/news/:id` News詳細

### 画面共通要件

- ヘッダーにロゴと主要導線を配置する。
- フッターに店舗情報（住所・営業時間・最寄り駅）を表示する。

## 4.2 管理画面

**管理画面は WordPress 管理ダッシュボード内で完結します。**

- WordPress 管理画面 > News（カスタム投稿タイプ）
- 新規投稿作成画面で本文・公開状態を管理
- 公開管理は WordPress ネイティブの「公開」ボタン
- メディアライブラリで画像管理

### 管理画面の責務

- WordPress 側で全てのお知らせ CRUD を実行
- REST API 経由で React フロントエンドに配信

## 5. データ設計（お知らせ）

### 5.1 データ管理

- **管理場所**: WordPress（CPT: News）
- **配信方法**: REST API（`/wp-json/wp/v2/news`）
- **認証**: 公開データはなし（管理操作は WordPress 認証）

### 5.2 News データモデル

WordPress REST API レスポンス例：

```json
{
  "id": 1,
  "title": {
    "rendered": "5月のキャンペーンのお知らせ"
  },
  "content": {
    "rendered": "<p>この度、5月限定キャンペーンを実施します...</p>"
  },
  "status": "publish",
  "date": "2026-04-29T10:00:00",
  "modified": "2026-04-29T15:30:00"
}
```

### 5.3 React での型定義

```ts
export type NewsItem = {
  id: number
  title: string
  content: string
  published: boolean
  publishedAt: string
  updatedAt: string
}
```

### 5.4 表示ルール

- 公開画面: `status === "publish"` のみ表示
- データ取得: GET `/wp-json/wp/v2/news?status=publish&per_page=10`
- 一覧順: `date` 降順（新しい順）
- キャッシング: 適切な HTTP キャッシュヘッダー活用

## 6. コンポーネント方針（React）

### 6.1 ディレクトリ構造

```
src/
├── components/         # 共通UIコンポーネント
│   ├── common/
│   ├── layout/
│   └── ui/
├── features/
│   └── news/          # News 機能固有（API 呼び出しロジック）
│       ├── hooks/
│       ├── types/
│       └── api/
├── pages/
│   ├── public/        # 公開ページ
│   │   ├── TopPage.tsx
│   │   ├── NewsListPage.tsx
│   │   ├── NewsDetailPage.tsx
│   │   └── ...
│   └── NotFoundPage.tsx
├── lib/               # ユーティリティ
└── main.tsx
```

### 6.2 責務分離

- **`components/`**: UI コンポーネント（プレゼンテーション専用）
- **`features/news/`**: ビジネスロジック・API 連携
  - `api/fetchNews()` など REST API クライアント
  - News 型定義
- **`pages/`**: 公開ページ（React コンポーネント）
  - データ取得ロジックは `features/news` フックで実装
- **管理画面**: 実装なし（WordPress で完結）

## 7. 非機能要件

## 7.1 アクセシビリティ

- 画像に代替テキストを設定する。
- 見出し階層を論理的に保つ。
- フォームラベルと入力要素を関連付ける。
- 主要操作はキーボードで実行可能にする。

## 7.2 パフォーマンス

- ロゴ・画像は適正サイズで配信する。
- 不要ライブラリを増やさない。
- 主要ページのLCP悪化を防ぐ。
- News API 呼び出しは キャッシング戦略を立案

## 7.3 SEO

- 各ページに固有title/descriptionを設定する。
- 店舗情報を明記してローカル検索流入を意識する。
- OGP 画像は WordPress メディアライブラリから参照

## 8. REST API 仕様

### 8.1 News エンドポイント

#### 一覧取得

```
GET /wp-json/wp/v2/news?status=publish&per_page=10&orderby=date&order=desc
```

**レスポンス**: News オブジェクト配列

#### 詳細取得

```
GET /wp-json/wp/v2/news/{id}
```

### 8.2 オレーション・ポリシー

- 公開ページは `status=publish` のみ取得
- キャッシュヘッダー: `Cache-Control: public, max-age=3600`
- エラー時: 404, 500 エラーハンドリング

## 9. デプロイメント・環境構成

### 9.1 本番構成

```
+------------------+          +------------------+
| WordPress サーバー |          |  React ホスティング  |
| (PHP/MySQL)      | <--API--> | (Vercel/Netlify) |
| 管理画面: /wp-admin |         | 公開サイト: /     |
+------------------+          +------------------+
```

- **WordPress**: 標準レンタルサーバー（ロリポップ、エックスサーバー等）
- **React SPA**: Vercel / Netlify（無料ティア可）
- **API 通信**: CORS 設定で REST API へアクセス

### 9.2 環境変数

React 側:
```
VITE_API_URL=https://your-wordpress-domain.com
```

WordPress 側:
```
CORS ヘッダー設定（プラグイン: WP CORS Enable 等）
```

## 10. 開発環境構築

### 10.1 前提環境

- Node.js 18+（React 開発用）
- PHP 8.1+（WordPress ローカル開発用・オプション）
- Docker（WordPress ローカル開発用・推奨）

### 10.2 起動手順

**React 開発サーバー**:
```bash
npm install
npm run dev
```
ローカル: http://localhost:5173

**WordPress（Docker 使用時）**:
```bash
docker-compose up
```
ローカル: http://localhost:8000

## 11. 受け入れ基準

- WordPressからREST API経由でお知らせ一覧・詳細が取得できる
- 公開/非公開の切替が React フロントエンドに反映される
- スマートフォン幅（360px-430px）でUI崩れがない
- News APIレスポンス遅延が 1秒以内

## 12. 実装フェーズ

### Phase 1: 基盤構築

1. React Vite プロジェクト環境整備
2. WordPress REST API クライアント実装（Axios/Fetch）
3. 環境変数設定（VITE_API_URL）

### Phase 2: フロントエンド実装

1. ルーティング設定（React Router）
2. 公開ページ骨組み実装
3. ヘッダー/フッター実装

### Phase 3: News 機能実装

1. News API フック実装
2. News 一覧ページ実装
3. News 詳細ページ実装

### Phase 4: デプロイメント

1. WordPress REST API CORS 設定
2. React ビルド最適化
3. Vercel/Netlify へのデプロイ
4. 本番環境設定
