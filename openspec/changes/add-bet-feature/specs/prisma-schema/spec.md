## ADDED Requirements

### Requirement: Bet モデル定義

Bet モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名は snake_case で定義されなければならない（SHALL）。

#### Scenario: Bet モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** Bet モデルに id（autoincrement）、fk_prediction_id（Int, unique）、value（Float）フィールドが定義されている
- **AND** fk_prediction_id は Prediction.id への外部キーとして定義されている

### Requirement: Bet スキーマの DB 反映

Prisma スキーマ変更がデータベースに反映されなければならない（SHALL）。

#### Scenario: スキーマ反映

- **WHEN** `bunx prisma db push` を実行する
- **THEN** PostgreSQL に Bet テーブルが作成される

## MODIFIED Requirements

### Requirement: Prediction モデル定義

Prediction モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名は snake_case で定義されなければならない（SHALL）。

#### Scenario: Prediction モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** Prediction モデルに id（autoincrement）、fk_topic_id（Int）、prediction_type（PredictionType）、fk_bet_id（Int?）、created_at（DateTime）フィールドが定義されている
- **AND** fk_topic_id は Topic.id への外部キーとして定義されている
- **AND** fk_bet_id は Bet.id への外部キーとして定義されている（nullable）
