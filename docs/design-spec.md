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

### Topページ（デザイン再現対象）

デザイン案の再現を最優先し、以下のセクションを固定で構成する。

1. ヒーロー（FV）
2. 強み4カラム（USP）
3. Menu訴求（価格リスト + 画像）
4. About + Gallery 2カラム
5. 予約CTAバンド（LINE / ホットペッパー / SNS）
6. フッター（店舗情報 + 補助導線）

### Topページ ワイヤー（PC）

- ヘッダー: 半透明白背景、左ロゴ、中央〜右に7件ナビ
- FV 左: コピー、説明、ブランドロゴタイポ
- FV 右: メインビジュアル（人物の目元写真）
- FV 装飾: 左右に線画フラワー、右下に円形バッジ
- FV 下端: Scrollインジケータ
- USP: 4要素を横並び、中央区切り線あり
- Menu: 左にメニュー名と価格、右に目元クローズアップ画像
- About/Gallery: 2カラムカード
- 予約CTA: 横長の帯に3導線ボタン
- Footer: 左ロゴ、中央店舗情報、右補助ナビ

### Topページ ワイヤー（SP: 360px-430px）

- ヘッダー: ロゴ + ハンバーガー（固定）
- FV: 1カラム（画像先出し、コピーは中央寄せ）
- USP: 2x2グリッド
- Menu: 縦積み（価格リストの可読性優先）
- About/Gallery: 縦積み
- 予約CTA: 3ボタンを縦積み、全て高さ44px以上
- Footer: 情報を2段に圧縮

### デザイン・トークン（再現ルール）

- ベースカラー:
  - 背景: #f7f4f2
  - サブ背景: #efe6e2
  - テキスト: #4f4643
  - アクセント: #d9c1bb
- 角丸:
  - ボタン: 9999px（ピル型）
  - カード: 8px-12px
- 罫線:
  - 基本: 1px solid #e7dddd
- 影:
  - 基本は無し、必要箇所のみ極小（浮遊感を出しすぎない）
- 余白:
  - セクション上下: 64px（SPは40px）
  - コンテンツ左右: 24px（SPは16px）

### タイポグラフィ（近似）

- 欧文見出し/ロゴ補助: Cormorant Garamond
- 和文本文: Noto Serif JP
- UI文字: Noto Sans JP
- 文字サイズ目安:
  - FV主見出し: 40px（SP: 28px）
  - セクション見出し: 44px（SP: 32px）
  - 本文: 15px-16px
  - ナビ: 14px

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
- **Topページ編集**: WordPress（固定ページ + カスタムフィールド）

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

### 5.5 Topページ CMS項目（WordPress）

Topページは「見た目は固定、文言と画像はCMS更新可能」を基本とする。

- hero_catch_main: FV主見出し
- hero_catch_sub: FV補足文
- hero_image: FVメイン画像
- hero_badge_text: 円形バッジ文言
- usp_items[4]: 強み（タイトル/説明/アイコン）
- menu_highlight_items: メニュー名 + 価格
- menu_cta_url: メニュー一覧リンク
- about_text: About本文
- about_image: About画像
- gallery_images[3]: Galleryサムネイル
- reservation_line_url: LINE予約リンク
- reservation_hotpepper_url: ホットペッパーリンク
- reservation_instagram_url: Instagramリンク
- shop_address / open_hours / closed_day: 店舗情報

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

### 8.3 Topページ エンドポイント方針

以下のいずれかを採用する。

1. 固定ページ + カスタムフィールドを REST 公開
2. 専用カスタムエンドポイント（例: `/wp-json/cocopua/v1/top`）

MVPでは 1 を優先し、取得失敗時はフロントエンドのフォールバック文言を表示する。

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
- Topページがデザイン案に対してレイアウト・配色・余白・情報順で高再現である
- 予約導線がFV内とCTAバンドの双方に存在し、2タップ以内で遷移可能

## 12. 実装フェーズ

### Phase 1: 基盤構築

1. React Vite プロジェクト環境整備
2. WordPress REST API クライアント実装（Axios/Fetch）
3. 環境変数設定（VITE_API_URL）

### Phase 1.5: デザイン基盤

1. フォント導入（和文/欧文）
2. カラートークンと余白スケール定義
3. 共通UI（見出し、ピルボタン、カード、区切り線）作成

### Phase 2: フロントエンド実装

1. Topページをデザイン準拠で実装（FV〜Footer）
2. ヘッダー/フッターを共通化
3. SP最適化（360px-430px）

### Phase 2-WP: WordPress 並走実装

1. Topページ用カスタムフィールド定義
2. REST API 公開設定（フィールド追加）
3. CORS / キャッシュ設定
4. サンプルデータ投入

### Phase 3: News 機能実装

1. News API フック実装
2. News 一覧ページ実装
3. News 詳細ページ実装

### Phase 4: デプロイメント

1. WordPress REST API CORS 設定
2. React ビルド最適化
3. Vercel/Netlify へのデプロイ
4. 本番環境設定

## 13. 並走開発ルール（デザイン再現 + WP実装）

### 13.1 進め方

- フロントエンドはモックデータで先にUIを完成させる
- WordPress側は同時にフィールド設計とAPI整備を進める
- API接続時に段階的にモックから実データへ差し替える

### 13.2 Definition of Ready（実装着手条件）

- Topページの全セクション構成が確定
- CMS更新対象フィールドが確定
- 予約導線URLの運用方針が確定

### 13.3 Definition of Done（完了条件）

- 参照デザインに対して視覚的一貫性を保っている
- SP（360px-430px）で主要導線が指1本で操作可能
- WordPress更新内容が公開画面に反映される
- 主要API失敗時に画面が破綻しない
