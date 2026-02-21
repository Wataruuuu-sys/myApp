## MODIFIED Requirements

### Requirement: TODOの表示

TODOページはDBに保存された追加済みのTODOアイテムを一覧で表示しなければならない（SHALL）。

#### Scenario: 初期状態

- **WHEN** TODOページにアクセスする
- **AND** DBにTODOアイテムが存在しない
- **THEN** TODOアイテムは表示されない

#### Scenario: TODOが存在する場合

- **WHEN** TODOページにアクセスする
- **AND** DBにTODOアイテムが存在する
- **THEN** 保存済みのTODOアイテムが一覧で表示される

#### Scenario: データの永続化確認

- **WHEN** TODOアイテムを追加した後にページをリロードする
- **THEN** 追加済みのTODOアイテムが引き続き表示される

### Requirement: TODOの追加

ユーザーがテキストを入力して追加ボタンを押すと、TODOアイテムがDBに保存され一覧に追加されなければならない（SHALL）。

#### Scenario: 新規追加

- **WHEN** テキスト入力欄にテキストを入力する
- **AND** 追加ボタンを押す
- **THEN** 入力したテキストがDBに保存される
- **AND** TODO一覧に表示される
- **AND** テキスト入力欄が空になる

#### Scenario: 空文字での追加防止

- **WHEN** テキスト入力欄が空の状態で追加ボタンを押す
- **THEN** TODOアイテムはDBに保存されない
