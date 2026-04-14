## ADDED Requirements

### Requirement: PredictionType Enum 定義

PredictionType Enum が Prisma Schema に定義されていなければならない（SHALL）。

#### Scenario: PredictionType Enum の構造

- **WHEN** Prisma Schema を参照する
- **THEN** PredictionType Enum に `number` の値が定義されている

### Requirement: Prediction モデル定義

Prediction モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名は snake_case で定義されなければならない（SHALL）。

#### Scenario: Prediction モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** Prediction モデルに id（autoincrement）、fk_topic_id（Int）、prediction_type（PredictionType）、created_at（DateTime）フィールドが定義されている
- **AND** fk_topic_id は Topic.id への外部キーとして定義されている

### Requirement: PredictionNumber モデル定義

PredictionNumber モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名は snake_case で定義されなければならない（SHALL）。

#### Scenario: PredictionNumber モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** PredictionNumber モデルに id（autoincrement）、fk_prediction_id（Int）、predict（Float）、created_at（DateTime）フィールドが定義されている
- **AND** fk_prediction_id は Prediction.id への外部キーとして定義されている

### Requirement: Prediction スキーマの DB 反映

Prisma スキーマ変更がデータベースに反映されなければならない（SHALL）。

#### Scenario: スキーマ反映

- **WHEN** `bunx prisma db push` を実行する
- **THEN** PostgreSQL に Prediction テーブル、PredictionNumber テーブル、PredictionType Enum が作成される
