## ADDED Requirements

### Requirement: Topicの作成

ユーザーがタイトルを入力して送信ボタンを押すと、Topicが DBに保存されなければならない（SHALL）。作成されたTopicのステータスは常に `open` でなければならない（SHALL）。

#### Scenario: 新規作成

- **WHEN** `/topic/new` ページでタイトルを入力する
- **AND** 送信ボタンを押す
- **THEN** 入力したタイトルとステータス `open` でTopicがDBに保存される

#### Scenario: 空文字での作成防止

- **WHEN** `/topic/new` ページでタイトルが空の状態で送信ボタンを押す
- **THEN** TopicはDBに保存されない

### Requirement: Topic作成はUsecase層を経由しなければならない

Server ActionによるTopic作成操作はUsecase層を経由しなければならない（SHALL）。Server ActionはFormDataの解析と `revalidatePath` の呼び出しのみを行い、バリデーションロジックをUsecaseに委譲しなければならない（SHALL）。

#### Scenario: 有効なタイトルでTopicを作成する

- **WHEN** 有効なタイトル文字列を含むFormDataをServer Actionに渡す
- **THEN** Usecase層の `add` が呼び出される
- **AND** Server ActionはAddTopicResult { ok: true } を返す

#### Scenario: 無効なタイトルでTopicを作成しようとする

- **WHEN** タイトルが文字列でないFormDataをServer Actionに渡す
- **THEN** Usecase層の `add` は呼び出されない
- **AND** Server ActionはAddTopicResult { ok: false, error: "invalid_title" } を返す

### Requirement: Server ActionはAddTopicResult型を返さなければならない

Server ActionはAddTopicResult型を返さなければならない（SHALL）。AddTopicResultはok: trueの成功状態またはok: falseとerrorを含む失敗状態のいずれかでなければならない（SHALL）。

#### Scenario: 成功時の返却値

- **WHEN** Topic作成が正常に完了する
- **THEN** AddTopicResult { ok: true } が返却される

#### Scenario: 失敗時の返却値

- **WHEN** バリデーションエラーが発生する
- **THEN** AddTopicResult { ok: false, error: "invalid_title" } が返却される
