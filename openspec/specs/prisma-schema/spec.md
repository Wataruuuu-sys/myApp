### Requirement: Prisma スキーマ定義

Todo モデルが Prisma Schema に定義されていなければならない（SHALL）。

#### Scenario: Todo モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** Todo モデルに id（autoincrement）、title（String）、createdAt（DateTime）フィールドが定義されている

### Requirement: マイグレーション実行

Prisma マイグレーションによりデータベースにスキーマが反映されなければならない（SHALL）。

#### Scenario: 初回マイグレーション

- **WHEN** `bunx prisma migrate dev` を実行する
- **THEN** PostgreSQL に Todo テーブルが作成される

### Requirement: TopicStatus Enum定義

TopicStatus Enumが Prisma Schemaに定義されていなければならない（SHALL）。

#### Scenario: TopicStatus Enumの構造

- **WHEN** Prisma Schema を参照する
- **THEN** TopicStatus Enumに `open`、`closed`、`answered` の3つの値が定義されている

### Requirement: Topic モデル定義

Topic モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名はsnake_caseで定義されなければならない（SHALL）。

#### Scenario: Topic モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** Topic モデルに id（autoincrement）、title（String）、status（TopicStatus, default: open）、closed_at（DateTime?）、created_at（DateTime）フィールドが定義されている

### Requirement: Topicマイグレーション実行

Prisma マイグレーションによりデータベースに Topic スキーマが反映されなければならない（SHALL）。

#### Scenario: Topicマイグレーション

- **WHEN** `bunx prisma migrate dev` を実行する
- **THEN** PostgreSQL に Topic テーブルと TopicStatus Enum が作成される

### Requirement: AnswerType Enum 定義

AnswerType Enum が Prisma Schema に定義されていなければならない（SHALL）。

#### Scenario: AnswerType Enum の構造

- **WHEN** Prisma Schema を参照する
- **THEN** AnswerType Enum に `number` の値が定義されている

### Requirement: Answer モデル定義

Answer モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名は snake_case で定義されなければならない（SHALL）。

#### Scenario: Answer モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** Answer モデルに id（autoincrement）、fk_topic_id（Int）、answer_type（AnswerType）、created_at（DateTime）フィールドが定義されている
- **AND** fk_topic_id は Topic.id への外部キーとして定義されている

### Requirement: AnswerNumber モデル定義

AnswerNumber モデルが Prisma Schema に定義されていなければならない（SHALL）。フィールド名は snake_case で定義されなければならない（SHALL）。

#### Scenario: AnswerNumber モデルの構造

- **WHEN** Prisma Schema を参照する
- **THEN** AnswerNumber モデルに id（autoincrement）、fk_answer_id（Int）、answer（Float）、created_at（DateTime）フィールドが定義されている
- **AND** fk_answer_id は Answer.id への外部キーとして定義されている

### Requirement: Answer スキーマの DB 反映

Prisma スキーマ変更がデータベースに反映されなければならない（SHALL）。

#### Scenario: スキーマ反映

- **WHEN** `bunx prisma db push` を実行する
- **THEN** PostgreSQL に Answer テーブル、AnswerNumber テーブル、AnswerType Enum が作成される

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
