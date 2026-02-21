## ADDED Requirements

### Requirement: TODOの表示

TODOページは追加済みのTODOアイテムを一覧で表示しなければならない（SHALL）。

#### Scenario: 初期状態

- **WHEN** TODOページにアクセスする
- **THEN** TODOアイテムは表示されない

#### Scenario: TODOが存在する場合

- **WHEN** TODOアイテムが追加されている
- **THEN** 追加済みのTODOアイテムが一覧で表示される

### Requirement: TODOの追加

ユーザーがテキストを入力して追加ボタンを押すと、TODOアイテムが一覧に追加されなければならない（SHALL）。

#### Scenario: 新規追加

- **WHEN** テキスト入力欄にテキストを入力する
- **AND** 追加ボタンを押す
- **THEN** 入力したテキストがTODO一覧に表示される
- **AND** テキスト入力欄が空になる

#### Scenario: 空文字での追加防止

- **WHEN** テキスト入力欄が空の状態で追加ボタンを押す
- **THEN** TODOアイテムは追加されない
