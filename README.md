# Cocopua HP

アイサロン Cocopua のホームページ制作プロジェクトです。

## プロジェクト概要

- 目的: サロンの魅力訴求と予約導線最適化
- 構成: **WordPress（バックエンド）+ React（フロントエンド）**
- 優先: モバイル体験（360px-430px）
- 方針: 運用のしやすさとモバイルUX の両立

## 構成図

```
┌─────────────────┐          ┌──────────────────┐
│  WordPress      │          │  React SPA       │
│  (PHP/MySQL)    │─REST API→│  (Vite/TypeScript)
│                 │          │                  │
│ • News CPT      │←─────────│ • 公開ページ     │
│ • 管理画面      │ JSON     │ • News 一覧/詳細│
│ • メディア      │          └──────────────────┘
└─────────────────┘
   (標準レンサ)       (Vercel/Netlify)
```

### 責務分離

| 機能               | 管理場所             | 技術               |
| ------------------ | -------------------- | ------------------ |
| **お知らせ CRUD**  | WordPress 管理画面   | PHP + MySQL        |
| **公開ページ表示** | React フロントエンド | React + TypeScript |
| **データ配信**     | WordPress REST API   | JSON               |

## 技術スタック

### フロントエンド（このプロジェクト）

- **React** 19
- **TypeScript**
- **Vite** ビルドツール
- **Tailwind CSS** スタイリング
- **shadcn/ui** UI コンポーネント
- **React Router** ルーティング
- **Axios** REST API クライアント

### バックエンド（別プロジェクト）

- **WordPress** 6.0+
- **PHP** 8.1+
- **MySQL** 8.4 LTS（安定版）
- **REST API** 標準機能 + カスタム拡張

## MVPスコープ

### React 公開ページ

- `/` Top
- `/menu` Menu
- `/gallery` Gallery
- `/staff` Staff
- `/access` Access
- `/faq` FAQ
- `/news` News 一覧
- `/news/:id` News 詳細

### WordPress 管理機能

- News カスタム投稿タイプ
- 公開/下書き管理
- メディアライブラリ

## ドキュメント

| ドキュメント                                                                                          | 用途                             |
| ----------------------------------------------------------------------------------------------------- | -------------------------------- |
| [設計書インデックス](docs/design-spec.md)                                                             | 分割設計書の導線                 |
| [フロントエンド設計](docs/frontend-spec.md)                                                           | 画面設計・UI仕様・コンポーネント |
| [バックエンド設計](docs/backend-spec.md)                                                              | WordPress構成・REST API・運用    |
| [DB設計](docs/database-spec.md)                                                                       | MySQL方針・バックアップ・監視    |
| [実装ロードマップ](docs/tickets/roadmap.md)                                                           | 並走開発のマイルストーン         |
| [FE実装チケット](docs/tickets/frontend-tickets.md)                                                    | フロントエンド作業分解           |
| [BE実装チケット](docs/tickets/backend-tickets.md)                                                     | WordPress作業分解                |
| [DB実装チケット](docs/tickets/database-tickets.md)                                                    | MySQL作業分解                    |
| [Copilot 指示](https://github.com/HokutoNishino/cocopua-hp/blob/main/.github/copilot-instructions.md) | 実装ガイドラインと優先順位       |
| [ロゴ運用](assets/brand/LOGO_USAGE.md)                                                                | ブランドガイドライン             |

## セットアップ

### 前提環境

- Node.js 18+
- npm 或いは yarn
- （オプション）Docker（WordPress ローカル開発用）

### React 開発環境

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（http://localhost:5173）
npm run dev

# ビルド（dist/ に出力）
npm run build

# ビルド後のプレビュー
npm run preview

# リント実行
npm run lint
```

### 環境変数

`.env` ファイルを作成（ローカル開発用）:

```
VITE_API_URL=http://localhost:8000
```

本番環境（Vercel/Netlify）:

```
VITE_API_URL=https://your-wordpress-domain.com
```

### WordPress 連携（ローカル Docker）

別途 WordPress プロジェクトで:

```bash
docker-compose up
# http://localhost:8000 でアクセス可能
```

REST API は自動有効化されます。

## プロジェクト構造

```
cocopua-hp/
├── docs/
│   ├── design-spec.md           # 設計書インデックス
│   ├── frontend-spec.md         # フロントエンド設計
│   ├── backend-spec.md          # バックエンド設計
│   └── database-spec.md         # DB設計（MySQL 8.4 LTS）
├── public/                      # 静的アセット
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   │   └── PublicLayout.tsx
│   │   └── ui/                 # shadcn/ui コンポーネント
│   ├── features/
│   │   └── news/
│   │       ├── api/            # News REST API クライアント
│   │       ├── hooks/          # useNews() など
│   │       └── types/          # NewsItem 型定義
│   ├── pages/
│   │   └── public/
│   │       ├── TopPage.tsx
│   │       ├── NewsListPage.tsx
│   │       ├── NewsDetailPage.tsx
│   │       └── ...
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

## 実装の流れ

### Phase 1: 基盤構築

- [ ] Axios REST API クライアント実装
- [ ] 環境変数設定
- [ ] React Router セットアップ

### Phase 2: UI/レイアウト

- [ ] ヘッダー・フッター実装
- [ ] 共通レイアウトコンポーネント
- [ ] 予約ボタン導線

### Phase 3: News 機能

- [ ] News API フック（`useNews()`）
- [ ] News 一覧ページ
- [ ] News 詳細ページ

### Phase 4: デプロイ

- [ ] Vercel/Netlify 設定
- [ ] CORS 設定
- [ ] 本番環境テスト

## 開発ガイドライン

詳細は [`.github/copilot-instructions.md`](https://github.com/HokutoNishino/cocopua-hp/blob/main/.github/copilot-instructions.md) を参照

**重点**

1. **モバイル体験**: スマートフォン幅（360px-430px）を最優先
2. **予約導線**: 全ページから2タップ以内で外部SaaSへ遷移
3. **API連携**: WordPress REST API からデータを効率的に取得
4. **保守性**: コンポーネント・機能ごとに分離

## WordPressプロジェクト

WordPress バックエンド開発は別リポジトリで管理されます。
REST API 設定や News CPT カスタマイズはそちらで行われます。

### 必要な WordPress 設定

- REST API 有効化
- News CPT 登録と REST サポート
- CORS ヘッダー設定
- メディアライブラリ設定
- ヘッダー・フッター・OG画像に同一ロゴを利用して一貫性を保つ

## セットアップ

```bash
npm install
```

## Dockerでの起動

```bash
cp .env.example .env
docker compose up --build
```

- アクセス先: `http://localhost:5173`
- 停止: `docker compose down`
- 依存更新時: `docker compose build --no-cache`

## 開発コマンド

```bash
npm run dev
npm run build
npm run preview
```

## 環境変数

- `VITE_RESERVATION_URL`: 予約SaaSの遷移先URL

## ディレクトリ方針

```text
.
├── .github/
│   └── copilot-instructions.md
├── assets/
│   └── brand/
├── docs/
│   ├── design-spec.md
│   ├── frontend-spec.md
│   ├── backend-spec.md
│   └── database-spec.md
├── src/
│   ├── components/
│   ├── features/
│   │   └── news/
│   ├── pages/
│   │   └── public/
│   └── lib/
└── README.md
```

## 直近タスク

1. ルーティング導入と公開側ページ骨組み作成
2. WordPress側のNews運用フロー整備（CPT/公開設定）
3. 予約SaaSリンクを共通CTAコンポーネント化
4. 店舗情報・メニュー情報の本番コンテンツ反映
