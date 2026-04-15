## MODIFIED Requirements

### Requirement: Button コンポーネント
ドメイン知識を持たない汎用ボタンコンポーネントを提供する。`type`, `onClick`, `disabled`, `children`, `variant` を props として受け取り、ビジネスロジックを含まない。`variant` は `"primary"` または `"ghost"` を受け取り、デフォルトは `"primary"` とする。

#### Scenario: ボタンをレンダリングする
- **WHEN** `children` を渡して Button をレンダリングする
- **THEN** ラベルとして children が表示される `<button>` 要素がレンダリングされる

#### Scenario: 無効化状態のボタン
- **WHEN** `disabled={true}` を渡す
- **THEN** ボタンは操作不能になり、クリックしても `onClick` が呼ばれない

#### Scenario: primary バリアントのスタイル
- **WHEN** `variant="primary"`（またはデフォルト）でレンダリングする
- **THEN** ボタンは `bg-primary` の背景色、白テキスト、角丸、ホバー時に `bg-primary-hover` が適用されたスタイルで表示される

#### Scenario: ghost バリアントのスタイル
- **WHEN** `variant="ghost"` でレンダリングする
- **THEN** ボタンは背景なし、`text-primary` カラー、ホバー時にアンダーラインが表示されるスタイルで表示される

#### Scenario: disabled 状態の視覚的フィードバック
- **WHEN** `disabled={true}` を渡す
- **THEN** カーソルが `cursor-not-allowed` となり、視覚的に操作不能であることが伝わるスタイルが適用される

---

### Requirement: Input コンポーネント
ドメイン知識を持たない汎用テキスト/数値入力コンポーネントを提供する。`type`, `name`, `placeholder`, `required`, `step` を props として受け取る。ボーダー、パディング、フォーカスリングを持つスタイルが適用される。

#### Scenario: テキスト入力のレンダリング
- **WHEN** `type="text"` と `name` を渡す
- **THEN** 対応する `<input type="text">` 要素がレンダリングされる

#### Scenario: 数値入力のレンダリング
- **WHEN** `type="number"` と `step` を渡す
- **THEN** `<input type="number" step={step}>` 要素がレンダリングされる

#### Scenario: フォーカス時の視覚的フィードバック
- **WHEN** 入力フィールドにフォーカスが当たる
- **THEN** `ring-2 ring-primary` のフォーカスリングが表示され、フォーカス状態が視覚的に明確になる

#### Scenario: 通常状態のスタイル
- **WHEN** フォーカスのない通常状態でレンダリングする
- **THEN** `border border-border` のボーダーと適切なパディングが適用され、入力エリアが明確に識別できる

---

### Requirement: Heading コンポーネント
ドメイン知識を持たない汎用見出しコンポーネントを提供する。`level`（1〜3）と `children` を props として受け取り、対応する `<h1>`〜`<h3>` 要素をレンダリングする。各 `level` に応じたフォントサイズとウェイトが適用される。

#### Scenario: レベル1の見出し
- **WHEN** `level={1}` と `children` を渡す
- **THEN** `<h1>` 要素に children がレンダリングされ、`text-2xl font-bold` のスタイルが適用される

#### Scenario: レベル2の見出し
- **WHEN** `level={2}` と `children` を渡す
- **THEN** `<h2>` 要素に children がレンダリングされ、`text-xl font-semibold` のスタイルが適用される

#### Scenario: レベル3の見出し
- **WHEN** `level={3}` と `children` を渡す
- **THEN** `<h3>` 要素に children がレンダリングされ、`text-lg font-medium` のスタイルが適用される

---

### Requirement: Anchor コンポーネント
ドメイン知識を持たない汎用リンクコンポーネントを提供する。`href` と `children` を props として受け取る。Next.js の `Link` をラップする。`text-primary` カラーとホバー時のアンダーラインが適用される。

#### Scenario: リンクのレンダリング
- **WHEN** `href` と `children` を渡す
- **THEN** 指定した `href` に遷移する `<a>` 要素がレンダリングされる

#### Scenario: リンクのスタイル
- **WHEN** Anchor をレンダリングする
- **THEN** `text-primary` カラーが適用され、ホバー時にアンダーラインが表示される

---

### Requirement: ListItem コンポーネント
ドメイン知識を持たない汎用リストアイテムコンポーネントを提供する。`children` を受け取り `<li>` 要素をレンダリングする。読みやすい縦方向のスペーシングが適用される。

#### Scenario: リストアイテムのレンダリング
- **WHEN** `children` を渡す
- **THEN** children を内包する `<li>` 要素がレンダリングされ、適切な縦スペーシング（`py-1` または同等）が適用される
