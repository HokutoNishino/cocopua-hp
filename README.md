# Cocopua HP

アイサロン Cocopua のホームページ制作プロジェクトです。

## プロジェクト概要

- 目的: サロンの魅力訴求と予約導線の最適化
- 優先: モバイル体験（360px-430px）と離脱しにくい予約導線
- 方針: 高コストな独自機能を避け、運用しやすいMVPを先行リリース

## 決定事項（固定）

- 予約は外部SaaSを利用し、自前予約システムは実装しない
- フロントエンドは React + Vite + TypeScript（Next.jsは採用しない）
- UI は shadcn/ui を活用して品質と実装速度を両立する
- お知らせ機能は公開側（一覧・詳細）と管理側（投稿・編集・削除・公開管理）を用意する

## MVPスコープ

### 公開側

- Top
- Menu
- Gallery
- Staff
- Access
- FAQ
- Reservation（外部予約SaaSへの導線）
- News（一覧・詳細）

### 管理側

- News Admin（投稿・編集・削除・公開/非公開）

## 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router

## ドキュメント

- 実装ルール: `.github/copilot-instructions.md`
- 設計書: `docs/design-spec.md`
- ロゴ運用: `assets/brand/LOGO_USAGE.md`

## ロゴ運用

- ロゴ本体: `assets/brand/cocopua-logo.jpg`
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
│   └── design-spec.md
├── src/
│   ├── components/
│   ├── features/
│   │   └── news/
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   └── lib/
└── README.md
```

## 直近タスク

1. ルーティング導入と公開側ページ骨組み作成
2. お知らせ管理画面の最小CRUD実装
3. 予約SaaSリンクを共通CTAコンポーネント化
4. 店舗情報・メニュー情報の本番コンテンツ反映
