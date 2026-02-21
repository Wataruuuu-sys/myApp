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
