## ADDED Requirements

### Requirement: Topic詳細ページの表示

`/topic/[id]` ページは対象 Topic の詳細情報と関連する予想を表示しなければならない（SHALL）。

#### Scenario: 存在する Topic の詳細ページにアクセスする

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** 対象 Topic が DB に存在する
- **THEN** Topic のタイトルとステータスが SSR で表示される

#### Scenario: 存在しない Topic の詳細ページにアクセスする

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** 対象 Topic が DB に存在しない
- **THEN** 404 相当のページが表示される

### Requirement: 予想の表示

Topic詳細ページは関連する予想を表示しなければならない（SHALL）。

#### Scenario: 予想が存在する場合

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** その Topic に Prediction が存在する
- **THEN** 予想の数値が表示される

#### Scenario: 予想がなく topic が open の場合

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** その Topic に Prediction が存在しない
- **AND** Topic のステータスが `open` である
- **THEN** 「予想がない」という文言が表示される
- **AND** `/topic/[id]/predictions` ページへのリンクが表示される

#### Scenario: 予想がなく topic が closed または answered の場合

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** その Topic に Prediction が存在しない
- **AND** Topic のステータスが `closed` または `answered` である
- **THEN** 「予想がない」という文言が表示される
- **AND** `/topic/[id]/predictions` ページへのリンクは表示されない

### Requirement: 回答の表示

Topic ステータスが `answered` の場合、Topic詳細ページは回答を表示しなければならない（SHALL）。

#### Scenario: answered ステータスの Topic を表示する

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** Topic のステータスが `answered` である
- **THEN** 回答の数値が表示される

#### Scenario: answered 以外のステータスの Topic を表示する

- **WHEN** `/topic/[id]` ページにアクセスする
- **AND** Topic のステータスが `open` または `closed` である
- **THEN** 回答は表示されない

### Requirement: Topic詳細取得は Usecase 層を経由しなければならない

SSR による Topic 詳細データの取得は Usecase 層を経由しなければならない（SHALL）。`page.tsx` は Prisma を直接参照してはならない（SHALL NOT）。

#### Scenario: Topic詳細ページをサーバーサイドでレンダリングする

- **WHEN** `/topic/[id]` ページにアクセスする
- **THEN** Usecase 層経由で Topic・Prediction・Answer が取得される
- **AND** 取得結果がページに SSR でレンダリングされる
