---
description: コンポーネント層のコーディングルール
paths: ['src/components/**/*.ts']
---

# Atomic Design

`src/components/` 配下は Atomic Design の3層構成を採用する。

```
src/components/
├── atoms/      # ドメイン知識を持たない基本UI要素（Button, Input, Heading など）
├── molecules/  # atoms を組み合わせた複合UI要素（FormField, NumberInputForm など）
└── organisms/  # ドメイン知識を持つページ単位の複合コンポーネント（TopicForm, TopicList など）
```

**層ごとのルール:**

- `atoms/` → props のみで制御する。ドメイン型・Server Action を import しない
- `molecules/` → atoms を組み合わせる。ドメイン型・Server Action を import しない
- `organisms/` → ドメイン型・Server Action を扱ってよい。`"use client"` は必要最小限
- ページ（`app/`）→ organisms を利用する。UI の実装をページファイルに直接書かない

**命名ルール:**

- atoms・molecules にドメイン用語（Topic, Prediction 等）を含めない
- organisms はドメイン用語を名前に含めてよい（例: `TopicForm`, `TopicList`）