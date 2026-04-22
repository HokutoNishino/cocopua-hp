# Cocopua

アイサロン向けホームページ制作プロジェクトです。

## 方針（2026-04-22時点）

- 予約機能は自前実装せず、外部SaaSへの導線に集約する
- フロントエンドはNext.jsではなくReactで構築する
- UIはshadcn/uiを活用し、最小工数で清潔感のあるデザインを作る
- 運用向けに「お知らせ投稿画面（管理用）」を用意する

## ロゴ運用

- 店舗ロゴは `assets/brand/cocopua-logo.jpg` として配置する
- 利用ルールは `assets/brand/LOGO_USAGE.md` を参照する
- ヘッダー・フッター・OG画像で同一ブランドロゴを使い、見た目の一貫性を保つ

## 目的

- 予約導線が分かりやすいサイトを作る
- サロンの雰囲気と信頼感を伝える
- スマホでの閲覧・操作を最優先に最適化する

## 想定ページ構成

- Top（ファーストビュー、特徴、CTA）
- Menu（施術メニューと料金）
- Gallery（デザイン実績）
- Staff（スタッフ紹介）
- Access（住所、営業時間、地図）
- FAQ（よくある質問）
- Reservation（外部予約SaaSへの導線ページ）
- News（お知らせ一覧）

## 管理画面（最小構成）

- News Admin（お知らせ投稿画面）
- 必須機能: 投稿、編集、削除、公開/非公開
- 将来拡張を見据えつつ、まずはシンプルな運用を優先する

## 技術スタック（初期案）

- React + TypeScript
- Vite（軽量な開発環境）
- shadcn/ui（UIコンポーネント）
- React Router（画面遷移）
- 状態管理はまず最小（Context またはローカル状態）

## 初期開発方針

- 日本語を基本言語とする
- モバイルファーストで設計する
- 主要CTA（予約）は全ページから外部SaaSへ到達可能にする
- 画像は軽量化し、ページ表示速度を意識する
- アクセシビリティ（コントラスト、代替テキスト、見出し構造）を担保する
- 予約ロジックは実装せず、SaaS連携の品質（導線、文言、離脱防止）に注力する

## ディレクトリ方針（案）

```text
.
├── README.md
├── .github/
│   └── copilot-instructions.md
└── src/
    ├── pages/
    │   ├── public/
    │   └── admin/
    ├── components/
    ├── styles/
    ├── features/
    │   └── news/
    └── assets/
```

## 次のステップ

1. Publicページ（Top/Menu/Reservation/News）の骨組み実装
2. News Admin（投稿画面）の最小実装
3. 外部予約SaaSの導線ボタンを全ページ共通化
4. 店舗情報・メニュー情報の本番文言反映

## 開発コマンド

- 依存インストール: npm install
- 開発サーバー起動: npm run dev
- 本番ビルド: npm run build
- プレビュー: npm run preview
