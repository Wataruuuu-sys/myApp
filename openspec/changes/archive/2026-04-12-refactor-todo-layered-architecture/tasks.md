## 1. 型定義

- [x] 1.1 `src/types/todo.ts` を作成し、`AddTodoRequest` と `AddTodoResult` 型を定義する

## 2. Domain層

- [x] 2.1 `src/domain/Todo.ts` を作成し、`Todo` エンティティクラスと `Todo.from(model: TodoModel)` ファクトリを実装する

## 3. Repository層

- [x] 3.1 `src/repositories/IRepository/ITodoRepository.ts` を作成し、`create` / `all` メソッドのインターフェースを定義する（戻り値は `TodoModel`）
- [x] 3.2 `src/repositories/TodoRepository.ts` を作成し、`ITodoRepository` を実装する（Prismaを使用）

## 4. Usecase層

- [x] 4.1 `src/usecases/IUsecase/ITodoUsecase.ts` を作成し、`add` / `todos` メソッドのインターフェースを定義する（戻り値は `Todo` ドメインオブジェクト）
- [x] 4.2 `src/usecases/TodoUsecase.ts` を作成し、`ITodoUsecase` を実装する（バリデーション・trim・`Todo.from()` 変換を含む）

## 5. DI配線

- [x] 5.1 `src/lib/container.ts` を作成し、`TodoRepository` と `TodoUsecase` のシングルトンを配線する

## 6. App層の修正

- [x] 6.1 `src/app/todo/actions.ts` をUsecase経由に書き直し、`AddTodoResult` を返すようにする
- [x] 6.2 `src/app/todo/page.tsx` のPrisma直接参照をUsecase経由に変更する

## 7. テストの再編

- [x] 7.1 `src/tests/repositories/TodoRepository.test.ts` を新規作成する（Prismaモック、クエリ引数・戻り値を検証）
- [x] 7.2 `src/tests/usecases/TodoUsecase.test.ts` を新規作成する（`ITodoRepository` モック、バリデーション・変換ロジックを検証）
- [x] 7.3 `src/tests/app/todo/actions.test.ts` を書き直す（`ITodoUsecase` モック、`AddTodoResult` の値と `revalidatePath` 呼び出しを検証）
- [x] 7.4 全テストがパスすることを確認する（`npm test` または `npx vitest`）
