## ADDED Requirements

### Requirement: Bet の作成・更新

Prediction に紐づく Bet を作成または更新できなければならない（SHALL）。Bet.value は数値でなければならない（SHALL）。1 つの Prediction に対して Bet は最大 1 件でなければならない（SHALL）。既に Bet が存在する場合は value を更新し、Bet レコードは新規作成しない（SHALL）。

#### Scenario: 初回 Bet の作成

- **WHEN** Bet が存在しない Prediction に対して有効な数値で Bet を保存する
- **THEN** Bet レコードが新規作成され、Prediction.fk_bet_id が更新され、成功を返す

#### Scenario: 既存 Bet の更新

- **WHEN** 既に Bet が存在する Prediction に対して有効な数値で Bet を保存する
- **THEN** 既存 Bet の value が新しい値に更新され、Bet レコードは新規作成されない
- **AND** 成功を返す

#### Scenario: 数値でない入力の拒否

- **WHEN** 数値に変換できない文字列で Bet を保存しようとする
- **THEN** `invalid_bet` エラーを返し、データは作成・更新されない

#### Scenario: 存在しない Prediction への Bet を拒否

- **WHEN** 存在しない predictionId で Bet を保存しようとする
- **THEN** `prediction_not_found` エラーを返し、データは作成されない

### Requirement: Bet の参照

Prediction に紐づく Bet を取得できなければならない（SHALL）。

#### Scenario: Bet の取得

- **WHEN** predictionId を指定して Bet を取得する
- **THEN** その Prediction に紐づく Bet の value を返す

#### Scenario: Bet が未作成の場合の取得

- **WHEN** Bet が存在しない Prediction の Bet を取得する
- **THEN** null を返す
