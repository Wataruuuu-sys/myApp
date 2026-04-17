## Why

デスクトップ表示で要素が画面幅いっぱいに広がるレイアウト問題、1トピックに1件しか予想を登録できないUI・データモデルの制約、および予想・Betの編集操作が直感的でないUX問題が重なっており、アプリとしての使い勝手を損ねている。

## What Changes

- **BREAKING** 全ページにmax-widthを持つ中央寄せレイアウトコンテナを適用し、デスクトップ表示時の過剰な横伸びを防ぐ
- **BREAKING** 1トピックに対して予想（Prediction）を複数登録・編集できるように仕様変更する（現行: 最大1件）
- 予想カードとBetカードを統合する（予想ごとにBet情報をインラインで表示・編集）
- Betの新規設定・編集を「インライン編集モード」に変更し、直感的な操作フローを実現する
- 予想一覧の末尾に「+ 予想を追加」ボタンを設け、新規予想の作成UIを提供する

## Capabilities

### New Capabilities
- `page-layout`: 全ページ共通のmax-width・padding・セクション間マージンを定義するレイアウトコンポーネント

### Modified Capabilities
- `topic-prediction`: 1トピックあたりの予想件数を「最大1件」から「複数可」に変更。予想の新規作成・個別編集が可能になる
- `ui-organisms`: TopicDetail・PredictionFormを予想1:N構造に対応させ、予想+Betを統合カードとして表示するUIに変更。Betのインライン編集UXに対応

## Impact

- `src/app/` 配下の全ページコンポーネント（layout.tsx または各page.tsx）にレイアウトコンテナを適用
- `src/usecases/` の予想関連ユースケース：「既存Predictionを上書き」ロジックを削除し、複数作成・個別更新に変更
- `src/repositories/` の予想関連リポジトリ：upsert → insert/update 分離
- `src/components/` の TopicDetail, PredictionForm, BetForm コンポーネント再設計
- `src/types/prediction.ts`：PredictionInput・SubmitPredictionResult の型見直し
- DBスキーマ変更なし（Topic→Prediction は既に 1:N、Prediction→Bet は既に 1:1）
