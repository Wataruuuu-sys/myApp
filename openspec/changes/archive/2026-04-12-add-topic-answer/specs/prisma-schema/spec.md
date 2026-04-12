## ADDED Requirements

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
