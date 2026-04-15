## ADDED Requirements

### Requirement: FormField コンポーネント
ラベルと入力欄を組み合わせた汎用フォームフィールドコンポーネントを提供する。`label`, `name`, `type`, `placeholder`, `required`, `step` を props として受け取る。ドメイン知識を含まない。

#### Scenario: ラベル付き入力フィールドのレンダリング
- **WHEN** `label` と `name` を渡す
- **THEN** ラベルテキストと対応する入力欄が組み合わせてレンダリングされる

---

### Requirement: NumberInputForm コンポーネント
数値入力フィールドと送信ボタンを組み合わせた汎用フォームコンポーネントを提供する。`action`（form action）, `inputName`, `step`, `submitLabel` を props として受け取る。ドメイン知識を含まない。

#### Scenario: フォームのレンダリング
- **WHEN** `action` と `inputName`, `submitLabel` を渡す
- **THEN** 数値入力フィールドと送信ボタンを持つ `<form>` がレンダリングされる

#### Scenario: フォームの送信
- **WHEN** 値を入力してボタンをクリックする
- **THEN** `action` に指定した form action が呼び出される
