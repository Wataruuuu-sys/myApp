# ui-organisms

## Purpose

Atoms・Molecules を組み合わせ、ドメインコンテキストを持つUIコンポーネント群（Atomic Design におけるOrganisms層）を提供する。

## Requirements

### Requirement: TopicForm コンポーネント
新規Topic作成フォームを提供する。タイトル入力と送信を担い、送信後にフォームをリセットする。`"use client"` コンポーネントとして実装する。

#### Scenario: フォームの送信
- **WHEN** タイトルを入力して送信する
- **THEN** `addTopic` Server Action が呼ばれ、フォームがリセットされる

---

### Requirement: TopicList コンポーネント
Topicの一覧と新規作成リンクを表示する。`topics` の配列を props として受け取る。

#### Scenario: Topic一覧の表示
- **WHEN** `topics` 配列を渡す
- **THEN** 各 Topic のタイトルとステータスがリストで表示され、詳細ページへのリンクが提供される

#### Scenario: 新規作成リンクの表示
- **WHEN** コンポーネントをレンダリングする
- **THEN** `/topic/new` へのリンクが表示される

---

### Requirement: TopicDetail コンポーネント
Topic の詳細（タイトル、ステータス、予想、回答）を表示する。`topic`, `prediction`, `answer` を props として受け取る。

#### Scenario: 予想がある場合の表示
- **WHEN** `prediction` が存在する
- **THEN** 予想の値が表示される

#### Scenario: 予想がなく open 状態の場合
- **WHEN** `prediction` が null かつ `topic.status === "open"`
- **THEN** 「予想がない」と予想ページへのリンクが表示される

#### Scenario: 回答がある場合の表示
- **WHEN** `answer` が存在する
- **THEN** 回答の値が表示される

---

### Requirement: PredictionForm コンポーネント
予想送信フォームと予想一覧を表示する。`topicId`, `topicStatus`, `predictions`, `action` を props として受け取る。

#### Scenario: open 状態での予想フォーム表示
- **WHEN** `topicStatus === "open"`
- **THEN** 数値入力フォームが表示される

#### Scenario: 予想一覧の表示
- **WHEN** `predictions` 配列を渡す
- **THEN** 各予想の値がリストで表示される

---

### Requirement: AnswerForm コンポーネント
回答送信フォームを表示する。`action` を props として受け取る。

#### Scenario: フォームの表示
- **WHEN** `action` を渡してレンダリングする
- **THEN** 数値入力フィールドと送信ボタンが表示される
