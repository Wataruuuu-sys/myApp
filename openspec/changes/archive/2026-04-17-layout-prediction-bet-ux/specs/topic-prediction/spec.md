## MODIFIED Requirements

### Requirement: 予想の投稿

Topic が `open` ステータスの場合に限り、ユーザーは数値による予想を新規作成または既存予想を編集できなければならない（SHALL）。1つの Topic に対して Prediction は複数件作成できなければならない（SHALL）。予想の新規作成では Prediction と PredictionNumber を新たに作成する（SHALL）。予想の編集では対象 Prediction の PredictionNumber を更新し、Prediction レコードは新規作成しない（SHALL）。

#### Scenario: 新規予想の作成

- **WHEN** `open` ステータスの Topic に対して有効な数値で予想を新規作成する
- **THEN** 新しい Prediction と PredictionNumber が作成され、成功を返す

#### Scenario: 既存予想の編集

- **WHEN** `open` ステータスの Topic に対して既存の Prediction を指定して有効な数値で編集する
- **THEN** 対象 Prediction の PredictionNumber.predict が新しい値に更新され、Prediction は新規作成されない
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

## REMOVED Requirements

### Requirement: 予想ページからの Bet 操作
**Reason**: 予想とBetを統合カードUIに変更したため、Bet操作は `ui-organisms` の統合カードコンポーネントを通じて行われる。ユースケース・リポジトリ層のBet操作仕様は `bet-management` spec で引き続き定義する。
**Migration**: BetFormは予想カード内にインライン統合される。Bet保存のServer ActionはそのままBetUsecaseを呼び出す。
