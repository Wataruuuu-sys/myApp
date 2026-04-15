## Why

現在のUIコンポーネントはページファイルにインライン実装されており、フォーム・リスト・リンクなどの共通UIパターンが重複している。Atomic Designに基づいてコンポーネントを層別に整理することで、UI修正の影響範囲を最小化し、再利用性と統一感を確保する。

## What Changes

- `src/components/atoms/` を新設し、ドメイン知識を持たない基本UI要素（Button, Input, Heading, LinkAnchor, ListItem）を定義する
- `src/components/molecules/` を新設し、atomsを組み合わせた複合UI要素（FormField, TextInputForm）を定義する
- `src/components/organisms/` を新設し、ドメイン知識を持つ複合コンポーネント（TopicForm, PredictionForm, AnswerForm, TopicListView, TopicDetailView）を定義する
- 既存の `src/app/topic/topic-form.tsx` を organisms へ移行し、atoms/molecules を活用するよう再実装する
- 各ページコンポーネント（topic/page, topic/[id]/page, answer/page, predictions/page）のインラインJSXをorganismsに切り出す

## Capabilities

### New Capabilities

- `ui-atoms`: ドメイン知識を持たない基本UIコンポーネント（Button, Input, Heading, LinkAnchor, ListItem）
- `ui-molecules`: atomsを組み合わせた複合UIコンポーネント（FormField, TextInputForm）
- `ui-organisms`: ドメイン知識を持つページ単位の複合コンポーネント群（TopicForm, PredictionForm, AnswerForm, TopicListView, TopicDetailView）

### Modified Capabilities

（なし。要件レベルの変更はなく、UI実装の構造的リファクタリングのみ）

## Impact

- 影響ファイル:
  - `src/app/topic/topic-form.tsx` → `src/components/organisms/` へ移行
  - `src/app/topic/page.tsx` — TopicListView を利用するよう変更
  - `src/app/topic/[id]/page.tsx` — TopicDetailView を利用するよう変更
  - `src/app/topic/[id]/answer/page.tsx` — AnswerForm を利用するよう変更
  - `src/app/topic/[id]/predictions/page.tsx` — PredictionForm を利用するよう変更
- 新設ディレクトリ: `src/components/atoms/`, `src/components/molecules/`, `src/components/organisms/`
- 外部依存・APIの変更なし
- Server Actions（`addTopic`, `submitAnswer`, `submitPrediction`）は変更なし
