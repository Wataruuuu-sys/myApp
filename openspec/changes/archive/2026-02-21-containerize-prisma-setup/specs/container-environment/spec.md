## ADDED Requirements

### Requirement: コンテナ環境の起動

Docker Compose により、アプリケーションとPostgreSQLをワンコマンドで起動できなければならない（SHALL）。

#### Scenario: 初回起動

- **WHEN** `docker compose up` を実行する
- **THEN** app コンテナと db コンテナが起動する
- **AND** app コンテナがポート3000でアクセス可能になる
- **AND** db コンテナがポート5432でアクセス可能になる

#### Scenario: DB起動待ち

- **WHEN** app コンテナが起動する
- **THEN** db コンテナの healthcheck が通るまで待機してから起動する

### Requirement: 開発時のホットリロード

dev ステージではソースコード変更がコンテナ内に即時反映されなければならない（SHALL）。

#### Scenario: ソースコード変更

- **WHEN** ホスト側でソースコードを変更する
- **THEN** コンテナ内の Next.js dev server が変更を検知し、リロードする
