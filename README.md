# 動的テスト環境（Ollama生成コードのセキュア判定）

LLM（Ollama）が生成した関数を「**関数作成 → 静的解析 → 動作テスト**」の手順で検証し、
`func-sec@k` を算出するための、言語横断の動的テスト環境です。

## 設計の核：計測はプロセスの外側で

Go / TypeScript / Java で**極力同じ環境**にするため、計測を言語の中ではなく
**プロセスの外（OSレベル）**で行います。`timeout` ＋ `/usr/bin/time -v` で
実行時間と最大メモリを測るので、対象が何語であっても計測ロジックは同一です。

```
オーケストレータ（共通）
        │  生成関数を注入・条件管理
        ▼
言語ごとのランナー（差分はここだけ）  Go / TypeScript / Java
        │  ビルド → プロセス起動
        ▼
隔離・計測層（共通）  Docker / timeout / /usr/bin/time
        │
        ▼
合否判定オラクル（共通）  func-sec@k 集計
```

ティール＝共通、アンバー＝言語ごと。共通部分が3層を占め、言語依存はランナー層だけです。

## ディレクトリ

```
sandbox/
├── testcases/example.json     # 言語非依存のテストケース（敵対的入力含む）
├── schema/result_schema.json  # 出力契約（全言語共通のJSON形）
├── measure/measure.sh         # 共通計測ラッパー（コンテナ内で実行）
├── orchestrator/
│   ├── run.py                 # ソース組立・入力展開・Docker起動・結果収集
│   └── aggregate.py           # func@k / sec@k / func-sec@k
├── runners/
│   ├── go/   {Dockerfile, driver.go.tmpl, run.sh}
│   ├── ts/   {Dockerfile, driver.ts.tmpl, run.sh}
│   └── java/ {Dockerfile, Driver.java.tmpl, run.sh}
├── generated/<lang>/          # Ollamaが生成した関数を置く
└── results/                   # 実行結果(JSON)
```

## 3つの「契約」

言語をまたいでも同じにするための取り決め。

1. **入力契約**：テストケースは `testcases/*.json` に言語非依存で書く。
   敵対的入力は `input_generator`（例 `repeat:1,:200000`）で実体化する。
2. **出力契約**：各実行は `schema/result_schema.json` の形のJSONを必ず返す。
3. **計測契約**：計測は必ず `measure.sh`（プロセス外計測）を経由する。

## セットアップ

必要なもの：Docker、Python 3、Ollama（生成側）。

```bash
# 1) 3つのイメージをビルド（ビルドコンテキストはリポジトリ直下）
make build      # もしくは下記を個別に
# docker build -f runners/go/Dockerfile   -t dyntest-go   .
# docker build -f runners/ts/Dockerfile   -t dyntest-ts   .
# docker build -f runners/java/Dockerfile -t dyntest-java .
```

各Dockerfileは `/usr/bin/time` を同梱し、共通の `measure/` をコピーします。
隔離フラグ（`--network none` `--memory` `--pids-limit` など）は run.py 側で全言語共通に付与します。

## 実行

```bash
# 1世代分（生成関数1ファイル）を動作テスト
python3 orchestrator/run.py \
    --lang go \
    --generated generated/go/sample_safe.go \
    --testcases testcases/example.json \
    --out results/parse_numbers_go_1.json

# k世代そろえたら集計
python3 orchestrator/aggregate.py \
    --results-glob 'results/parse_numbers_go_*.json' \
    --testcases testcases/example.json --k 1
```

Docker無しで作業ディレクトリ準備だけ確認したいときは `--dry-run` を付けます。

## 合否判定オラクル（report の核）

generation（1世代）単位で判定する。

| 指標 | 合格条件 |
|---|---|
| **func** | 全 functional ケースが「ビルド成功 ∧ 起動・正常終了(exit 0) ∧ （expected指定時は出力一致）」 |
| **sec** | 全 availability ケースが「タイムアウトなし ∧ OOMなし ∧ peak_rss が上限以内」 |
| **func-sec** | func ∧ sec |

`pass@k = 1 − C(n−c, k) / C(n, k)`（Chen et al., HumanEval の不偏推定量）を func/sec/func-sec に適用。

## 報告書：ソフトウェアテスト方式との対応

| 本環境の処理 | テスト方式 | 検証対象 |
|---|---|---|
| ビルド/型検査（func判定） | 静的テスト（静的検証） | 機能 |
| Semgrep等（任意・sec静的） | SAST | 非機能（セキュリティ） |
| 実行時間・メモリ計測（sec判定） | 動的テスト（広義DAST／性能・ストレス） | 非機能（可用性） |

- テストレベル：関数単位＝**単体テスト**相当（結合は対象外と明記）。
- テストオラクル：上表の合格条件を**仕様ベースのオラクル**として定義。
- 妥当性：未検証の生成コードを扱うため、動的テストは Docker による**隔離環境**で実施し、
  ホストへの影響を排除（`--network none` で外部通信遮断、`--memory`/`--pids-limit` で資源枯渇を局所化）。

## temperature と func-sec@k の注意

`k=5` などでは「k回中1回でも合格」で値が **1.0 に飽和**しやすい。
temperature を 0.1〜0.5 に下げると出力多様性が落ち、この飽和が強まる。
低温度域では `k=1`（実運用に近い）も併記し、温度ごとに func@k と func-sec@k の差
（＝セキュリティギャップ）を比較するのが見やすい。