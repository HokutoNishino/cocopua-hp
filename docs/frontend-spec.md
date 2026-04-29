# Cocopua フロントエンド設計書

最終更新: 2026-04-29

## 1. 目的

- 参照デザインを高再現で実装する。
- 予約導線を全ページ2タップ以内で到達可能にする。
- WordPress REST API と疎結合で連携し、UI変更を継続しやすくする。

## 2. 技術スタック

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui

## 3. 情報設計（IA）

### 3.1 公開ルート

- `/` Top
- `/menu` Menu
- `/gallery` Gallery
- `/staff` Staff
- `/access` Access
- `/faq` FAQ
- `/news` News一覧
- `/news/:id` News詳細
- `/404` Not Found

### 3.2 主要ユーザーフロー

1. Topでサロンの強みを認知
2. Menu/Newsで具体情報を確認
3. CTAから予約SaaSへ遷移

## 4. 画面設計

### 4.1 Topページ（再現対象）

#### セクション構成

1. ヘッダー（半透明）
2. ヒーロー（左テキスト/右ビジュアル）
3. USP 4カラム
4. Menu訴求
5. About + Gallery
6. 予約CTAバンド
7. フッター

#### PCレイアウト

- コンテンツ幅: 最大 1200px
- 2カラム比率: 5:7（FV）
- セクション上下余白: 64px

#### SPレイアウト（360px-430px）

- 1カラムに再構成
- セクション上下余白: 40px
- 主要ボタン高さ: 44px以上

### 4.2 下層ページ

#### 一覧ページ（Menu/Gallery/Staff/News）

- ヘッダー + セクション見出し + カード/リスト
- 予約CTAは各ページ下部に配置

#### 詳細ページ（News）

- パンくず代替の戻る導線
- 公開日、タイトル、本文
- 関連導線（News一覧 / 予約）

## 5. デザインシステム

### 5.1 カラー

- bg-base: `#f7f4f2`
- bg-sub: `#efe6e2`
- text-main: `#4f4643`
- accent: `#d9c1bb`
- border: `#e7dddd`

### 5.2 タイポ

- 見出し（欧文）: Cormorant Garamond
- 本文（和文）: Noto Serif JP
- UI（ラベル）: Noto Sans JP

### 5.3 余白・角丸

- section-y: 64px（SP: 40px）
- container-x: 24px（SP: 16px）
- radius-pill: 9999px
- radius-card: 12px

## 6. コンポーネント設計

### 6.1 レイアウト層

- `PublicLayout`
- `Header`
- `Footer`
- `ReservationCtaBand`

### 6.2 Top専用

- `HeroSection`
- `UspGrid`
- `MenuHighlight`
- `AboutGallerySection`

### 6.3 共通UI

- `SectionTitle`
- `PillButton`
- `InfoCard`
- `Divider`

## 7. 状態管理

### 7.1 原則

- ページ単位の局所状態を優先
- グローバル状態は最小化

### 7.2 データ取得

- `features/news` にAPIアクセスを集約
- Topページデータ取得も `features/top` に分離

## 8. API利用仕様（フロント側）

### 8.1 環境変数

- `VITE_API_URL`

### 8.2 呼び出し方針

- 一覧: クライアントサイド取得
- 詳細: ルートパラメータで取得
- 失敗時: 404はNotFound、5xxはユーザーフレンドリー表示

## 9. 非機能要件

### 9.1 パフォーマンス

- LCP対象画像を最適化
- 初回JSサイズを抑制
- 画像は遅延読み込みを基本

### 9.2 アクセシビリティ

- 見出し階層の厳守
- ボタン/リンクのラベル明確化
- キーボード操作可能

### 9.3 SEO

- 各ページ固有title/description
- ローカルSEO情報（住所・営業時間）を常設

## 10. 受け入れ基準

- デザイン案に対してレイアウト・配色・余白が高再現
- 360px-430pxで主要導線が崩れない
- 予約導線が常時視認できる
- API失敗時も画面が破綻しない
