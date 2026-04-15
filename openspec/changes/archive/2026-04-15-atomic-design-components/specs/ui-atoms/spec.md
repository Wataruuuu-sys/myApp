## ADDED Requirements

### Requirement: Button コンポーネント
ドメイン知識を持たない汎用ボタンコンポーネントを提供する。`type`, `onClick`, `disabled`, `children` を props として受け取り、ビジネスロジックを含まない。

#### Scenario: ボタンをレンダリングする
- **WHEN** `children` を渡して Button をレンダリングする
- **THEN** ラベルとして children が表示される `<button>` 要素がレンダリングされる

#### Scenario: 無効化状態のボタン
- **WHEN** `disabled={true}` を渡す
- **THEN** ボタンは操作不能になり、クリックしても `onClick` が呼ばれない

---

### Requirement: Input コンポーネント
ドメイン知識を持たない汎用テキスト/数値入力コンポーネントを提供する。`type`, `name`, `placeholder`, `required`, `step` を props として受け取る。

#### Scenario: テキスト入力のレンダリング
- **WHEN** `type="text"` と `name` を渡す
- **THEN** 対応する `<input type="text">` 要素がレンダリングされる

#### Scenario: 数値入力のレンダリング
- **WHEN** `type="number"` と `step` を渡す
- **THEN** `<input type="number" step={step}>` 要素がレンダリングされる

---

### Requirement: Heading コンポーネント
ドメイン知識を持たない汎用見出しコンポーネントを提供する。`level`（1〜3）と `children` を props として受け取り、対応する `<h1>`〜`<h3>` 要素をレンダリングする。

#### Scenario: レベル1の見出し
- **WHEN** `level={1}` と `children` を渡す
- **THEN** `<h1>` 要素に children がレンダリングされる

#### Scenario: レベル2の見出し
- **WHEN** `level={2}` と `children` を渡す
- **THEN** `<h2>` 要素に children がレンダリングされる

---

### Requirement: Anchor コンポーネント
ドメイン知識を持たない汎用リンクコンポーネントを提供する。`href` と `children` を props として受け取る。Next.js の `Link` をラップする。

#### Scenario: リンクのレンダリング
- **WHEN** `href` と `children` を渡す
- **THEN** 指定した `href` に遷移する `<a>` 要素がレンダリングされる

---

### Requirement: ListItem コンポーネント
ドメイン知識を持たない汎用リストアイテムコンポーネントを提供する。`children` を受け取り `<li>` 要素をレンダリングする。

#### Scenario: リストアイテムのレンダリング
- **WHEN** `children` を渡す
- **THEN** children を内包する `<li>` 要素がレンダリングされる
