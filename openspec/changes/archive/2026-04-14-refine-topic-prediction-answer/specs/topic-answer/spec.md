## MODIFIED Requirements

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
