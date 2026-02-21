## Context

Next.js 16 App Routerを使用したプロジェクト。既存ページ（Home, Hello）はServer Componentで実装されている。TODOページはユーザー操作を伴うため、Client Componentが必要。

## Goals / Non-Goals

**Goals:**
- TODOの一覧表示と新規追加ができるページを実装する
- テストでspecの全シナリオをカバーする

**Non-Goals:**
- データの永続化（ページリロードで消えてよい）
- 削除・編集・完了トグル機能
- スタイリングの作り込み

## Decisions

### Decision 1: Client Component として実装

`useState` によるローカル状態管理が必要なため、`"use client"` ディレクティブを使用する。今回のスコープではデータ永続化は不要なので、ページ内のstateのみで管理する。

### Decision 2: 単一ファイル構成

TODOページは小規模なため、`src/app/todo/page.tsx` の1ファイルに収める。コンポーネント分割は今後必要になった時点で行う。
