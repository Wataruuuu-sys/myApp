## ADDED Requirements

### Requirement: 回答フォームの表示

`/topic/[id]/answer` ページは、対象 Topic のタイトルと数値入力フォームを表示しなければならない（SHALL）。

#### Scenario: 存在する Topic の回答ページにアクセスする

- **WHEN** `/topic/[id]/answer` ページにアクセスする
- **AND** 対象 Topic が DB に存在する
- **THEN** Topic のタイトルと数値入力フォームが SSR で表示される

#### Scenario: 存在しない Topic の回答ページにアクセスする

- **WHEN** `/topic/[id]/answer` ページにアクセスする
- **AND** 対象 Topic が DB に存在しない
- **THEN** ページが見つからない旨が表示される（404 相当）

### Requirement: 回答の登録

ユーザーが数値を入力して送信ボタンを押すと、Answer と AnswerNumber が DB に保存され、Topic ステータスが `answered` に更新されなければならない（SHALL）。

#### Scenario: 有効な数値で回答を登録する

- **WHEN** `/topic/[id]/answer` ページで数値を入力する
- **AND** 送信ボタンを押す
- **THEN** Answer（answer_type: number）が DB に保存される
- **AND** AnswerNumber（answer: 入力値）が DB に保存される
- **AND** Topic のステータスが `answered` に更新される

#### Scenario: 空の入力で回答しようとする

- **WHEN** `/topic/[id]/answer` ページで入力が空の状態で送信ボタンを押す
- **THEN** Answer も AnswerNumber も DB に保存されない
- **AND** Topic のステータスは変更されない

#### Scenario: 既に `answered` の Topic に回答しようとする

- **WHEN** ステータスが `answered` の Topic に対して回答を送信する
- **THEN** Answer も AnswerNumber も DB に保存されない
- **AND** エラー結果（`already_answered`）が返される

### Requirement: 回答登録はUsecase層を経由しなければならない

Server Action による回答登録操作は Usecase 層を経由しなければならない（SHALL）。Server Action は FormData の解析と `revalidatePath` の呼び出しのみを行い、バリデーションロジックを Usecase に委譲しなければならない（SHALL）。

#### Scenario: 有効な入力値で回答を登録する

- **WHEN** 有効な数値文字列を含む FormData を Server Action に渡す
- **THEN** Usecase 層の `submit` が呼び出される
- **AND** Server Action は SubmitAnswerResult { ok: true } を返す

#### Scenario: 無効な入力値で回答しようとする

- **WHEN** 数値に変換できない文字列を含む FormData を Server Action に渡す
- **THEN** Usecase 層の `submit` は呼び出されない
- **AND** Server Action は SubmitAnswerResult { ok: false, error: "invalid_answer" } を返す

### Requirement: Server Action は SubmitAnswerResult 型を返さなければならない

Server Action は SubmitAnswerResult 型を返さなければならない（SHALL）。SubmitAnswerResult は ok: true の成功状態、または ok: false と error を含む失敗状態のいずれかでなければならない（SHALL）。

#### Scenario: 成功時の返却値

- **WHEN** 回答登録が正常に完了する
- **THEN** SubmitAnswerResult { ok: true } が返却される

#### Scenario: 失敗時の返却値（バリデーションエラー）

- **WHEN** バリデーションエラーが発生する
- **THEN** SubmitAnswerResult { ok: false, error: "invalid_answer" } が返却される

#### Scenario: 失敗時の返却値（既回答エラー）

- **WHEN** 対象 Topic が既に `answered` である
- **THEN** SubmitAnswerResult { ok: false, error: "already_answered" } が返却される
