## Purpose

Topic に対して回答を登録する機能。ユーザーは `/topic/[id]/answer` ページで数値を入力・送信し、Answer と AnswerNumber を DB に保存する。

## Requirements

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

ユーザーが数値を入力して送信ボタンを押すと、Answer と AnswerNumber が DB に保存されなければならない（SHALL）。1つの Topic に対して Answer は最大1件でなければならない（SHALL）。既に Answer が存在する場合は AnswerNumber を更新し、Answer レコードは新規作成しない（SHALL）。Topic ステータスが `answered` の場合は回答を登録・更新できない（SHALL NOT）。Topic ステータスの `answered` への更新は初回登録時のみ行う（SHALL）。

#### Scenario: 初回の回答登録（open から）

- **WHEN** `open` ステータスの Topic に対して Answer が存在しない状態で有効な数値を入力して送信する
- **THEN** Answer（answer_type: number）が DB に保存される
- **AND** AnswerNumber（answer: 入力値）が DB に保存される
- **AND** Topic のステータスが `answered` に更新される

#### Scenario: 初回の回答登録（closed から）

- **WHEN** `closed` ステータスの Topic に対して Answer が存在しない状態で有効な数値を入力して送信する
- **THEN** Answer（answer_type: number）が DB に保存される
- **AND** AnswerNumber（answer: 入力値）が DB に保存される
- **AND** Topic のステータスが `answered` に更新される

#### Scenario: 既存回答の上書き（open）

- **WHEN** `open` ステータスの Topic に対して既に Answer が存在する状態で有効な数値を入力して送信する
- **THEN** 既存 Answer の AnswerNumber.answer が新しい値に更新される
- **AND** Answer レコードは新規作成されない
- **AND** Topic のステータスは変更されない

#### Scenario: 既存回答の上書き（closed）

- **WHEN** `closed` ステータスの Topic に対して既に Answer が存在する状態で有効な数値を入力して送信する
- **THEN** 既存 Answer の AnswerNumber.answer が新しい値に更新される
- **AND** Answer レコードは新規作成されない
- **AND** Topic のステータスは変更されない

#### Scenario: 空の入力で回答しようとする

- **WHEN** 入力が空の状態で送信ボタンを押す
- **THEN** Answer も AnswerNumber も DB に保存されない
- **AND** Topic のステータスは変更されない

#### Scenario: answered の Topic に回答しようとする

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
