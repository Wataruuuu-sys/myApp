## Context

現在 `src/app/` 配下のページファイルにUIロジックが直接書かれており、フォーム・リスト・リンクといったUI要素が各ページで重複している。唯一のコンポーネントである `TopicForm` も `src/app/topic/` に混在していて、ページとコンポーネントの分離ができていない。

Atomic Designを採用し、`src/components/` 配下に `atoms / molecules / organisms` の3層を設ける。atoms・moleculesはドメイン知識を持たない純粋なUI部品とし、organismsでドメイン知識（Server Actions、データ型）を受け取る設計にする。

## Goals / Non-Goals

**Goals:**
- atoms・moleculesにビジネスドメインの命名・知識を含めない（`TopicForm` のような命名はorganisms以上）
- 重複するUIパターン（フォーム、リスト、ページ見出し）を共通コンポーネントに集約する
- 既存のServer ActionsとAPIを変更しない
- 既存のページルーティングを変更しない

**Non-Goals:**
- templates・pagesレイヤーの新設（Next.js App RouterのPageが担う）
- スタイリング・デザインシステムの導入（後続のデザイン作業に委ねる）
- テストの追加（コンポーネント自体の単純なリファクタリングのため）

## Decisions

### 1. ディレクトリ構成は `src/components/{atoms,molecules,organisms}/` とする

```
src/components/
  atoms/
    Button.tsx
    Input.tsx
    Heading.tsx
    Anchor.tsx
    ListItem.tsx
  molecules/
    FormField.tsx       # label + input の組み合わせ
    NumberInputForm.tsx # number input + submit button の組み合わせフォーム
  organisms/
    TopicForm.tsx         # src/app/topic/topic-form.tsx から移行
    PredictionForm.tsx
    AnswerForm.tsx
    TopicList.tsx
    TopicDetail.tsx
```

**理由**: Next.js App Router の `app/` ディレクトリと明確に分離でき、`atoms → molecules → organisms` の依存方向が一目でわかる。

### 2. atoms・moleculesは props のみで制御し、Server Action や usecase を import しない

atoms・moleculesは `onClick`, `onSubmit`, `children`, `value` などの汎用 props のみを受け取る。ドメイン型（`Topic`, `Prediction` など）も受け取らない。

**理由**: ドメイン知識が混入すると、UIの変更がビジネスロジックの変更と結びつき、再利用性と修正範囲の局所化という目的が損なわれる。

### 3. organisms は Server Component または "use client" を必要に応じて使う

- `TopicForm` は `useRef` を使うため `"use client"` を維持
- `PredictionForm`, `AnswerForm` は form action を直接渡す設計にすることで `"use client"` 不要にする
- `TopicList`, `TopicDetail` は Server Component として実装

**理由**: Client Component は最小限にとどめ、不要な JS バンドルを避ける。

### 4. 既存 `src/app/topic/topic-form.tsx` は削除し organisms へ完全移行

後方互換性は不要（コーディングルールに従い）。

## Risks / Trade-offs

- [リスク] organisms が増えるとページとの責務の境界が曖昧になる → organisms はページ固有のデータ取得を行わず、データを props で受け取る設計を徹底する
- [トレードオフ] organisms に渡す props が増えると page.tsx が冗長になる → 現状のアプリ規模では許容範囲。BFF的なデータ集約が必要になった段階でコンテナコンポーネントを検討する
