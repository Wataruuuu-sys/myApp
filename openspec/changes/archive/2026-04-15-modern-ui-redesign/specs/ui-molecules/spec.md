## MODIFIED Requirements

### Requirement: FormField コンポーネント
ラベルと入力欄を組み合わせた汎用フォームフィールドコンポーネントを提供する。`label`, `name`, `type`, `placeholder`, `required`, `step` を props として受け取る。ドメイン知識を含まない。ラベルと入力欄を縦積みレイアウトで表示し、スペーシングとラベルスタイルを適用する。

#### Scenario: ラベル付き入力フィールドのレンダリング
- **WHEN** `label` と `name` を渡す
- **THEN** ラベルテキストと対応する入力欄が縦積みでレンダリングされる

#### Scenario: ラベルのスタイル
- **WHEN** `label` を渡してレンダリングする
- **THEN** ラベルは `text-sm font-medium` のスタイルで表示され、入力欄との間に適切なスペーシングが設けられる

#### Scenario: フィールド間のスペーシング
- **WHEN** 複数の FormField を並べてレンダリングする
- **THEN** 各フィールドの間に `gap` または `mb-` による縦方向の余白が確保され、読みやすいレイアウトになる

---

### Requirement: NumberInputForm コンポーネント
数値入力フィールドと送信ボタンを組み合わせた汎用フォームコンポーネントを提供する。`action`（form action）, `inputName`, `step`, `submitLabel` を props として受け取る。ドメイン知識を含まない。入力フィールドと送信ボタンを横並びレイアウトで表示する。

#### Scenario: フォームのレンダリング
- **WHEN** `action` と `inputName`, `submitLabel` を渡す
- **THEN** 数値入力フィールドと送信ボタンを持つ `<form>` がレンダリングされる

#### Scenario: 横並びレイアウト
- **WHEN** フォームをレンダリングする
- **THEN** 入力フィールドとボタンが横並び（`flex` または `flex-row`）で配置され、フォームが一行に収まる

#### Scenario: フォームの送信
- **WHEN** 値を入力してボタンをクリックする
- **THEN** `action` に指定した form action が呼び出される
