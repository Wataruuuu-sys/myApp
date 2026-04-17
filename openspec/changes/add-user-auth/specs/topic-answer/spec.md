## MODIFIED Requirements

### Requirement: 回答フォームの表示

`/topic/[id]/answer` ページは、adminロールを持つ認証済みユーザーのみがアクセスでき、対象 Topic のタイトルと数値入力フォームを表示しなければならない（SHALL）。adminロール以外のユーザーがアクセスした場合はアクセス拒否を示すページを表示しなければならない（SHALL）。

#### Scenario: admin ユーザーが存在する Topic の回答ページにアクセスする

- **WHEN** adminロールを持つユーザーが `/topic/[id]/answer` ページにアクセスする
- **AND** 対象 Topic が DB に存在する
- **THEN** Topic のタイトルと数値入力フォームが SSR で表示される

#### Scenario: 存在しない Topic の回答ページにアクセスする

- **WHEN** adminロールを持つユーザーが `/topic/[id]/answer` ページにアクセスする
- **AND** 対象 Topic が DB に存在しない
- **THEN** ページが見つからない旨が表示される（404 相当）

#### Scenario: user ロールで回答ページにアクセスする

- **WHEN** userロールを持つユーザーが `/topic/[id]/answer` ページにアクセスする
- **THEN** アクセス拒否を示すページが表示される（403 相当）

## ADDED Requirements

### Requirement: 回答 Server Action の admin ガード

回答を登録する Server Action は、呼び出し元のセッションが adminロールであることを検証しなければならない（SHALL）。adminロール以外のセッションから呼び出された場合は、DB への書き込みを行わずにエラー結果を返さなければならない（SHALL）。

#### Scenario: admin ユーザーが有効な回答を登録する

- **WHEN** adminロールのセッションを持つユーザーが有効な数値を含む FormData を Server Action に渡す
- **THEN** 回答の登録処理が実行される

#### Scenario: user ロールが回答を登録しようとする

- **WHEN** userロールのセッションを持つユーザーが Server Action を呼び出す
- **THEN** Answer も AnswerNumber も DB に保存されない
- **AND** SubmitAnswerResult { ok: false, error: "forbidden" } が返される

#### Scenario: 未認証で Server Action を呼び出す

- **WHEN** セッションを持たないリクエストが Server Action を呼び出す
- **THEN** Answer も AnswerNumber も DB に保存されない
- **AND** SubmitAnswerResult { ok: false, error: "forbidden" } が返される
