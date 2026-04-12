## ADDED Requirements

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
