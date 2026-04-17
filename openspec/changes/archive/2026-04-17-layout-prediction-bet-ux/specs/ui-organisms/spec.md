## MODIFIED Requirements

### Requirement: TopicDetail コンポーネント
Topic の詳細（タイトル、ステータス、予想一覧、回答）を表示する。`topic`, `predictions`, `answer` を props として受け取る（`prediction` 単数から `predictions` 配列に変更）。予想は1件ずつ PredictionBetCard として表示し、各カードに Bet 情報をインライン表示する。セクションごとにカードレイアウトで情報を整理して表示する。

#### Scenario: 予想が複数ある場合の表示
- **WHEN** `predictions` 配列に複数件の予想が存在する
- **THEN** 各予想が個別の PredictionBetCard として縦に並んで表示される

#### Scenario: 予想がなく open 状態の場合
- **WHEN** `predictions` が空配列かつ `topic.status === "open"`
- **THEN** 「予想がない」と予想追加を促すUIが表示される

#### Scenario: 回答がある場合の表示
- **WHEN** `answer` が存在する
- **THEN** 回答の値が表示される

#### Scenario: 詳細ページのビジュアル
- **WHEN** TopicDetail をレンダリングする
- **THEN** タイトルは Heading コンポーネントで表示され、予想・回答等の各セクションは視覚的に区切られたカードまたはセクション要素として表示される

---

### Requirement: PredictionForm コンポーネント
予想一覧と予想追加フォームを表示する。`topicId`, `topicStatus`, `predictions`, `action` を props として受け取る。各予想を PredictionBetCard として表示し、一覧末尾に「+ 予想を追加」ボタンまたは新規予想入力フォームを配置する。

#### Scenario: 予想一覧の表示
- **WHEN** `predictions` 配列を渡す
- **THEN** 各予想が PredictionBetCard として表示される

#### Scenario: 予想追加ボタンの表示（open状態）
- **WHEN** `topicStatus === "open"`
- **THEN** 予想一覧の末尾に「+ 予想を追加」ボタンが表示される

#### Scenario: 予想追加フォームの展開
- **WHEN** `topicStatus === "open"` かつ「+ 予想を追加」ボタンをクリックする
- **THEN** 数値入力フォームが展開され、予想を入力して送信できる

#### Scenario: セクションのビジュアル
- **WHEN** PredictionForm をレンダリングする
- **THEN** 各予想カードと追加ボタンの間に視覚的なスペーシングが設けられ、レイアウトが整理されている

## ADDED Requirements

### Requirement: PredictionBetCard コンポーネント
1件の予想とそれに紐づくBet情報を統合表示するカードコンポーネントを提供する（SHALL）。予想の数値・Betの金額をまとめて表示し、それぞれのインライン編集を可能にする。

#### Scenario: 初期表示（表示モード）
- **WHEN** PredictionBetCard をレンダリングする
- **THEN** 予想の数値と、Betが存在する場合はBetの金額が表示モードで表示される

#### Scenario: 予想の編集モード
- **WHEN** 予想の数値部分をクリックまたは編集ボタンをタップする
- **THEN** 予想の数値が編集可能な入力フィールドに切り替わる

#### Scenario: Bet未設定時の表示
- **WHEN** Betが存在しない Prediction の PredictionBetCard を表示する
- **THEN** 「Betを設定」ボタンまたは入力プレースホルダーが表示される

#### Scenario: Bet設定済みの表示
- **WHEN** Betが存在する Prediction の PredictionBetCard を表示する
- **THEN** Betの金額が表示される

#### Scenario: Betの編集モード
- **WHEN** Betの金額部分をクリックまたは編集ボタンをタップする
- **THEN** Betの金額が編集可能な入力フィールドに切り替わり、保存・キャンセルが可能になる

#### Scenario: Bet保存後の表示更新
- **WHEN** Betの金額を入力して保存する
- **THEN** 入力フィールドが非表示になり、更新された金額が表示モードで表示される
