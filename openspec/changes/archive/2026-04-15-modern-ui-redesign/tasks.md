## 1. デザイントークンの定義

- [x] 1.1 `src/app/globals.css` の `@theme` ブロックにカラートークン（`--color-primary`, `--color-primary-hover`, `--color-surface`, `--color-muted`, `--color-border`, `--color-destructive`）を定義する
- [x] 1.2 `body` にサンセリフフォントファミリーとデフォルトテキストカラーを適用する

## 2. Atoms のスタイリング

- [x] 2.1 `Button` に `variant?: "primary" | "ghost"` prop を追加し、各バリアントのTailwindクラスを適用する
- [x] 2.2 `Button` の `disabled` 状態に `cursor-not-allowed` と opacity スタイルを適用する
- [x] 2.3 `Input` にボーダー・パディング・フォーカスリング（`ring-2 ring-primary`）のTailwindクラスを適用する
- [x] 2.4 `Heading` に `level` 別のフォントサイズ・ウェイトマッピングを実装する（h1: `text-2xl font-bold`, h2: `text-xl font-semibold`, h3: `text-lg font-medium`）
- [x] 2.5 `Anchor` に `text-primary` カラーとホバー時アンダーラインのスタイルを適用する
- [x] 2.6 `ListItem` に縦スペーシング（`py-1` または同等）を適用する

## 3. Molecules のスタイリング

- [x] 3.1 `FormField` のラベルに `text-sm font-medium` と入力欄との間のスペーシングを適用する
- [x] 3.2 `FormField` のラッパーdivに縦積みレイアウト（`flex flex-col gap-1`）を適用する
- [x] 3.3 `NumberInputForm` のフォームを横並びレイアウト（`flex gap-2 items-center`）に変更する

## 4. Organisms のスタイリング

- [x] 4.1 `TopicForm` のフォームにカードスタイル（白背景・角丸・ボーダーまたはシャドウ・パディング）と縦積みレイアウトを適用する
- [x] 4.2 `TopicList` のラッパーにカードスタイルを適用し、各Topicをボーダー区切りの行として表示する。ステータスをバッジスタイルで表示する
- [x] 4.3 `TopicDetail` に各セクション（予想・回答）を視覚的に区切るレイアウトを適用し、タイトルをHeadingコンポーネントで表示する
- [x] 4.4 `PredictionForm` のフォームセクションと一覧セクション間にスペーシングを設ける
- [x] 4.5 `AnswerForm` のフォームにカードスタイルとセクションラベルを追加する

## 5. 動作確認

- [x] 5.1 `/topic` 一覧ページをブラウザで開き、カード・リスト・リンクのスタイルが正しく適用されていることを確認する
- [x] 5.2 `/topic/new` ページをブラウザで開き、フォームのスタイルとフォーカスリングが正しく動作することを確認する
- [x] 5.3 Topicの詳細ページを開き、予想・回答各セクションの表示レイアウトを確認する
