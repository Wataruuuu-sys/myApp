## ADDED Requirements

### Requirement: ログイン

`/login` ページは loginId とパスワードの入力フォームを表示しなければならない（SHALL）。有効な認証情報を送信すると、セッションが確立され、`/topic` にリダイレクトされなければならない（SHALL）。

#### Scenario: 有効な認証情報でログインする

- **WHEN** `/login` ページで有効な loginId とパスワードを入力して送信する
- **THEN** Auth.js セッションが確立される
- **AND** `/topic` にリダイレクトされる

#### Scenario: 無効な認証情報でログインしようとする

- **WHEN** `/login` ページで存在しない loginId またはパスワードが誤った状態で送信する
- **THEN** セッションは確立されない
- **AND** ログインページに留まり、エラーメッセージが表示される

#### Scenario: 空の入力でログインしようとする

- **WHEN** loginId またはパスワードが空の状態で送信する
- **THEN** セッションは確立されない
- **AND** ログインページに留まる

### Requirement: ログアウト

ログイン済みユーザーはログアウトできなければならない（SHALL）。ログアウト後はセッションが無効化され、`/login` にリダイレクトされなければならない（SHALL）。

#### Scenario: ログアウトする

- **WHEN** ログイン済みのユーザーがログアウト操作を行う
- **THEN** セッションが無効化される
- **AND** `/login` にリダイレクトされる

### Requirement: セッションへのロール付与

認証セッションにはユーザーの role（`admin` または `user`）が含まれなければならない（SHALL）。

#### Scenario: admin ユーザーのセッション

- **WHEN** role が `admin` の User が認証する
- **THEN** セッションの `user.role` が `admin` である

#### Scenario: user ユーザーのセッション

- **WHEN** role が `user` の User が認証する
- **THEN** セッションの `user.role` が `user` である

### Requirement: 未認証ユーザーのリダイレクト

認証が必要なルートに未認証でアクセスした場合、`/login` にリダイレクトされなければならない（SHALL）。

#### Scenario: 未認証で保護ルートにアクセスする

- **WHEN** セッションを持たないユーザーが `/topic` 以下のいずれかのページにアクセスする
- **THEN** `/login` にリダイレクトされる

#### Scenario: 認証済みで保護ルートにアクセスする

- **WHEN** 有効なセッションを持つユーザーが `/topic` 以下のページにアクセスする
- **THEN** リダイレクトされずにページが表示される

#### Scenario: 認証済みで `/login` にアクセスする

- **WHEN** 有効なセッションを持つユーザーが `/login` にアクセスする
- **THEN** `/topic` にリダイレクトされる
