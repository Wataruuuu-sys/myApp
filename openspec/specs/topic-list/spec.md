### Requirement: Topicの表示

Topicページは DBに保存済みのTopicを一覧で表示しなければならない（SHALL）。

#### Scenario: 初期状態

- **WHEN** `/topic` ページにアクセスする
- **AND** DBにTopicが存在しない
- **THEN** Topicは表示されない

#### Scenario: Topicが存在する場合

- **WHEN** `/topic` ページにアクセスする
- **AND** DBにTopicが存在する
- **THEN** 保存済みのTopicが一覧で表示される
- **AND** 各TopicのタイトルとステータスがSSRで表示される

### Requirement: Topic一覧取得はUsecase層を経由しなければならない

SSRによるTopic一覧のデータ取得はUsecase層を経由しなければならない（SHALL）。`page.tsx` はPrismaを直接参照してはならない（SHALL NOT）。

#### Scenario: TopicページをサーバーサイドでレンダリングするS

- **WHEN** `/topic` ページにアクセスする
- **THEN** Usecase層経由でTopicリストが取得される
- **AND** 取得結果がページにSSRでレンダリングされる
