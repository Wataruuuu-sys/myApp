## ADDED Requirements

### Requirement: TODOの追加はUsecase層を経由しなければならない

Server ActionによるTODO追加操作はUsecase層を経由しなければならない（SHALL）。Server ActionはFormDataの解析とrevalidatePathの呼び出しのみを行い、バリデーションロジックをUsecaseに委譲しなければならない（SHALL）。

#### Scenario: 正常なタイトルでTODOを追加する

- **WHEN** 有効なタイトル文字列を含むFormDataをServer Actionに渡す
- **THEN** Usecase層のaddが呼び出される
- **AND** Server ActionはAddTodoResult { ok: true } を返す

#### Scenario: 無効なタイトルでTODOを追加しようとする

- **WHEN** タイトルが文字列でないFormDataをServer Actionに渡す
- **THEN** Usecase層のaddは呼び出されない
- **AND** Server ActionはAddTodoResult { ok: false, error: "invalid_title" } を返す

### Requirement: TODOの一覧取得はUsecase層を経由しなければならない

SSRによるTODO一覧のデータ取得はUsecase層を経由しなければならない（SHALL）。`page.tsx` はPrismaを直接参照してはならない（SHALL NOT）。

#### Scenario: TODOページをサーバーサイドでレンダリングする

- **WHEN** TODOページにアクセスする
- **THEN** Usecase層経由でTODOリストが取得される
- **AND** 取得結果がページにSSRでレンダリングされる

### Requirement: Server ActionはActionResult型を返さなければならない

Server ActionはAddTodoResult型を返さなければならない（SHALL）。AddTodoResultはok: trueの成功状態またはok: falseとerrorを含む失敗状態のいずれかでなければならない（SHALL）。

#### Scenario: 成功時の返却値

- **WHEN** TODO追加が正常に完了する
- **THEN** AddTodoResult { ok: true } が返却される

#### Scenario: 失敗時の返却値

- **WHEN** バリデーションエラーが発生する
- **THEN** AddTodoResult { ok: false, error: "invalid_title" } が返却される
