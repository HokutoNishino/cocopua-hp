# Cocopua 設計書インデックス

最終更新: 2026-04-29

本プロジェクトの設計書は、責務ごとに以下の3文書へ分割する。

## 1. フロントエンド設計

- 対象: 画面設計、UI仕様、コンポーネント、レスポンシブ、フロント側API利用
- 参照: `docs/frontend-spec.md`

## 2. バックエンド設計

- 対象: WordPress構成、CPT、REST API、CORS、運用
- 参照: `docs/backend-spec.md`

## 3. DB設計

- 対象: DBMS方針、テーブル運用、バックアップ、監視
- 参照: `docs/database-spec.md`

## 4. 共通方針

- アーキテクチャ: WordPress（バックエンド）+ React（フロントエンド）
- API連携: WordPress REST API
- DBMS: MySQL 8.4 LTS（安定版）
- 優先度: モバイル体験、予約導線、API安定性

## 5. 更新ルール

- UI変更は `docs/frontend-spec.md` を更新する。
- API/運用変更は `docs/backend-spec.md` を更新する。
- DB変更は `docs/database-spec.md` を更新する。
- 横断的な変更は3文書すべてで整合を取る。
