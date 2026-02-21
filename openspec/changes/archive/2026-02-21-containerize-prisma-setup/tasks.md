## 1. Docker 環境構築

- [x] 1.1 Dockerfile を作成する（base / dev / build ステージ）
- [x] 1.2 docker-compose.yaml を作成する（app + db サービス）
- [x] 1.3 .dockerignore を作成する

## 2. 環境変数

- [x] 2.1 .env.example を作成する（DATABASE_URL テンプレート）
- [x] 2.2 .env を作成し .gitignore に追加する

## 3. Prisma 導入

- [x] 3.1 prisma を依存に追加し、初期化する
- [x] 3.2 schema.prisma に Todo モデルを定義する
- [x] 3.3 初回マイグレーションを実行する

## 4. 検証

- [x] 4.1 `docker compose up` でコンテナが正常に起動することを確認する
- [x] 4.2 PostgreSQL に Todo テーブルが作成されていることを確認する
- [x] 4.3 既存テストが通ることを確認する
