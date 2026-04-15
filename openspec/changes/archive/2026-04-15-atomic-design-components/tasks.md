## 1. ディレクトリ構成の準備

- [x] 1.1 `src/components/atoms/`, `src/components/molecules/`, `src/components/organisms/` ディレクトリを作成する

## 2. Atoms の実装

- [x] 2.1 `src/components/atoms/Button.tsx` を作成する（`type`, `onClick`, `disabled`, `children` を props に持つ汎用ボタン）
- [x] 2.2 `src/components/atoms/Input.tsx` を作成する（`type`, `name`, `placeholder`, `required`, `step` を props に持つ汎用入力）
- [x] 2.3 `src/components/atoms/Heading.tsx` を作成する（`level: 1 | 2 | 3` と `children` を props に持つ汎用見出し）
- [x] 2.4 `src/components/atoms/Anchor.tsx` を作成する（`href` と `children` を props に持ち Next.js `Link` をラップ）
- [x] 2.5 `src/components/atoms/ListItem.tsx` を作成する（`children` を `<li>` でラップする汎用リストアイテム）

## 3. Molecules の実装

- [x] 3.1 `src/components/molecules/FormField.tsx` を作成する（`label`, `name`, `type`, `placeholder`, `required`, `step` を props に持つフォームフィールド）
- [x] 3.2 `src/components/molecules/NumberInputForm.tsx` を作成する（`action`, `inputName`, `step`, `submitLabel` を props に持つ数値入力フォーム）

## 4. Organisms の実装

- [x] 4.1 `src/components/organisms/TopicForm.tsx` を作成する（`"use client"`、`addTopic` Server Action を使用、送信後リセット）
- [x] 4.2 `src/components/organisms/TopicList.tsx` を作成する（`topics` 配列を props に受け取り一覧と新規作成リンクを表示）
- [x] 4.3 `src/components/organisms/TopicDetail.tsx` を作成する（`topic`, `prediction`, `answer` を props に受け取り詳細を表示）
- [x] 4.4 `src/components/organisms/PredictionForm.tsx` を作成する（`topicStatus`, `predictions`, `action` を props に受け取り予想フォームと一覧を表示）
- [x] 4.5 `src/components/organisms/AnswerForm.tsx` を作成する（`action` を props に受け取り回答フォームを表示）

## 5. CLAUDE.md へのアーキテクチャ規約の追記

- [x] 5.1 `CLAUDE.md` の「アーキテクチャ」セクションに Atomic Design パターンの規約（層の定義・依存方向・命名ルール）を追記する

## 6. ページへの組み込みと旧ファイルの削除

- [x] 6.1 `src/app/topic/page.tsx` を `TopicList` を使うよう更新する
- [x] 6.2 `src/app/topic/new/page.tsx` を `TopicForm`（organisms）を使うよう更新する
- [x] 6.3 `src/app/topic/[id]/page.tsx` を `TopicDetail` を使うよう更新する
- [x] 6.4 `src/app/topic/[id]/predictions/page.tsx` を `PredictionForm` を使うよう更新する
- [x] 6.5 `src/app/topic/[id]/answer/page.tsx` を `AnswerForm` を使うよう更新する
- [x] 6.6 `src/app/topic/topic-form.tsx` を削除する
