## ADDED Requirements

### Requirement: 予想ページからの Bet 操作

予想ページから Bet を作成・編集できなければならない（SHALL）。Bet の操作は予想の投稿とは独立していなければならない（SHALL）。

#### Scenario: Bet 未設定時の表示

- **WHEN** Bet が存在しない Prediction の予想ページを表示する
- **THEN** Bet 入力フォームが空の状態で表示される

#### Scenario: Bet 設定済みの表示

- **WHEN** Bet が存在する Prediction の予想ページを表示する
- **THEN** Bet 入力フォームに既存の value が表示される

#### Scenario: Bet の保存

- **WHEN** 予想ページの Bet フォームに数値を入力して保存する
- **THEN** Bet が作成または更新され、フォームに最新の value が表示される

#### Scenario: Bet 保存と予想投稿の独立性

- **WHEN** Bet フォームを送信する
- **THEN** 予想（PredictionNumber）は変更されない
