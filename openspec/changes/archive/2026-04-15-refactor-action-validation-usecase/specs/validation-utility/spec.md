## ADDED Requirements

### Requirement: FormData から string 値を安全に取得できる
`Validation` クラスは `FormData` から指定キーの値を取得し、string 型であれば値を返し、そうでなければ `null` を返す SHALL。

#### Scenario: string フィールドの取得成功
- **WHEN** `formData.get(key)` が string 型の値を返す
- **THEN** `Validation.string(formData, key)` はその string 値を返す

#### Scenario: フィールドが存在しない場合
- **WHEN** `formData.get(key)` が `null` を返す
- **THEN** `Validation.string(formData, key)` は `null` を返す

#### Scenario: フィールドが File 型の場合
- **WHEN** `formData.get(key)` が `File` インスタンスを返す
- **THEN** `Validation.string(formData, key)` は `null` を返す

### Requirement: Validation クラスはインスタンス化せずに利用できる
`Validation` のすべてのメソッドは static であり、インスタンスを生成せずに呼び出せる SHALL。

#### Scenario: static 呼び出し
- **WHEN** `Validation.string(formData, key)` を呼び出す
- **THEN** `new Validation()` なしで動作する
