## Purpose

Topic に対してユーザーが数値による予想を投稿・参照できる機能を提供する。

## Requirements

### Requirement: 予想の投稿

Topic が `open` ステータスの場合に限り、ユーザーは数値による予想を投稿・上書きできなければならない（SHALL）。1つの Topic に対して Prediction は最大1件でなければならない（SHALL）。既に Prediction が存在する場合は PredictionNumber を更新し、Prediction レコードは新規作成しない（SHALL）。

#### Scenario: 初回の予想投稿

- **WHEN** `open` ステータスの Topic に対して Prediction が存在しない状態で有効な数値で予想を投稿する
- **THEN** Prediction と PredictionNumber が新規作成され、成功を返す

#### Scenario: 既存予想の上書き

- **WHEN** `open` ステータスの Topic に対して既に Prediction が存在する状態で有効な数値で予想を投稿する
- **THEN** 既存 Prediction の PredictionNumber.predict が新しい値に更新され、Prediction は新規作成されない
- **AND** 成功を返す

#### Scenario: 数値でない入力の拒否

- **WHEN** 数値に変換できない文字列で予想を投稿する
- **THEN** `invalid_prediction` エラーを返し、データは作成・更新されない

#### Scenario: open 以外の Topic への予想を拒否

- **WHEN** `closed` または `answered` ステータスの Topic に対して予想を投稿する
- **THEN** `topic_not_open` エラーを返し、データは作成・更新されない

#### Scenario: 存在しない Topic への予想を拒否

- **WHEN** 存在しない topicId で予想を投稿する
- **THEN** `topic_not_open` エラーを返し、データは作成されない

### Requirement: 予想一覧の取得

Topic に紐づく全予想を取得できなければならない（SHALL）。

#### Scenario: 予想一覧の取得

- **WHEN** topicId を指定して予想一覧を取得する
- **THEN** その Topic に紐づく Prediction の一覧（各予想の数値を含む）を返す

#### Scenario: 予想がない場合の取得

- **WHEN** 予想が登録されていない Topic の予想一覧を取得する
- **THEN** 空配列を返す

### Requirement: 予想ページからの Bet 操作

予想ページから Bet を作成・編集できなければならない（SHALL）。Bet の操作は予想の投稿とは独立していなければならない（SHALL）。

#### Scenario: Bet 未設定時の表示

- **WHEN** Bet が存在しない Prediction の予想ページを表示する
- **THEN** Bet 入力フォームが空の状態で表示される

#### Scenario: Bet 設定済みの表示

- **WHEN** Bet が存在する Prediction の予想ページを表示する
- **THEN** Bet 入力フォームに既存の value が表示される

#### Scenario: Bet の保存

- **WHEN** 予想ページの Bet フォームに数値を入力して保存する
- **THEN** Bet が作成または更新され、フォームに最新の value が表示される

#### Scenario: Bet 保存と予想投稿の独立性

- **WHEN** Bet フォームを送信する
- **THEN** 予想（PredictionNumber）は変更されない
