# Bonsai-8B 検証環境のセットアップ

`pipeline/pipeline.py` から Bonsai-8B（[PrismML](https://prismml.com) の1-bitモデル、
8.2B params / 1.16GB）を叩けるようにする手順。

## なぜプロキシが要るか

Bonsai は全パラメータ 1-bit（`Q1_0`, group128）で学習されており、素の Ollama は
このテンソル型を読めない（`ggml` の type enum が Q1_0 の手前で終わっている）。そのため

- モデル本体の推論は [PrismML-Eng/llama.cpp](https://github.com/PrismML-Eng/llama.cpp)
  （`Q1_0` 対応フォーク）の `llama-server`（OpenAI互換API）が担当し、
- [eSlider/bonsai-ollama](https://github.com/eSlider/bonsai-ollama) が
  Ollama の `/api/generate` `/api/chat` を `llama-server` の OpenAI 形式に変換する
  リバースプロキシとして間に立つ。

`pipeline.py` は `OLLAMA_URL`（既定 `http://127.0.0.1:11434`）宛にしか喋らないので、
このプロキシを立てて `OLLAMA_URL` をそちらに向ければ既存コードは無改造で通る
（[[ollama-pipeline]] 参照）。

**このマシンでの注意**: 11434/11435 は Ollama.app（メニューバー常駐アプリ）が既に
使用中。bonsai-ollama-stack.sh は元々 `fuser -k 11434/tcp` を無条件で叩いて
既存プロセスを殺す作りだったため、常駐アプリを巻き込まないよう
`BONSAI_PROXY_LISTEN` 由来のポートだけを kill するよう patch した上で、
プロキシを **11436**、専用バックエンド ollama を **11437** に系統を分けて
立てている（`run_bonsai8b.sh` 参照）。既存の Ollama.app には一切触れない。

## 構成

```
bonsai/bonsai-ollama/          # eSlider/bonsai-ollama を vendor（.git は含めない）
├── cmd/bonsai-ollama-proxy/   # ソースは追跡する。isBonsaiModel() を
│                              #   "bonsai-1.7b" 限定 → "bonsai" prefix 全体に patch 済み
│                              #   （BONSAI_GGUF で差し替えたサイズ違いも通すため）
├── bin/                       # go build 成果物。.gitignore 対象
├── vendor/prism-llama/        # Prism 製 llama-server バイナリ一式。.gitignore 対象
├── models/bonsai-8b/          # Bonsai-8B-Q1_0.gguf (1.16GB)。.gitignore 対象
└── run_bonsai8b.sh            # 起動スクリプト（下記）
```

GGUF・vendor バイナリ・ビルド成果物はサイズが大きいため git には含めない
（`.gitignore` 参照）。壊れた/消えた場合は下の手順で作り直せる。

## セットアップ手順（このマシンで実施済み・再現用）

前提: macOS arm64（Apple Silicon）、RAM 8GB。ビルド済みバイナリを使うので
cmake 等でのソースビルドは不要。

```bash
# 1) Go（プロキシのビルドに必要）
brew install go

# 2) eSlider/bonsai-ollama を取得し、bonsai/bonsai-ollama/ に配置（.git は含めない）
git clone --depth 1 https://github.com/eSlider/bonsai-ollama.git /tmp/bonsai-ollama
rsync -a --exclude='.git' /tmp/bonsai-ollama/ bonsai/bonsai-ollama/

# 3) isBonsaiModel() を "bonsai" prefix 全体にマッチするよう patch
#    （cmd/bonsai-ollama-proxy/main.go — 詳細は git diff 参照）

# 4) プロキシをビルド
cd bonsai/bonsai-ollama
go build -o bin/bonsai-ollama-proxy ./cmd/bonsai-ollama-proxy

# 5) Prism llama-server（macOS arm64, KleidiAI最適化ビルド）を取得
mkdir -p vendor/prism-llama
curl -fL -o vendor/prism-llama/prism.tar.gz \
  "https://github.com/PrismML-Eng/llama.cpp/releases/download/prism-b9570-0ad1dab/llama-prism-b9570-0ad1dab-bin-macos-arm64-kleidiai.tar.gz"
tar -xzf vendor/prism-llama/prism.tar.gz -C vendor/prism-llama

# 6) Bonsai-8B の重み（Q1_0, 1.16GB）を取得
mkdir -p models/bonsai-8b
curl -fL -o models/bonsai-8b/Bonsai-8B-Q1_0.gguf \
  "https://huggingface.co/prism-ml/Bonsai-8B-gguf/resolve/main/Bonsai-8B-Q1_0.gguf"
```

## 起動

```bash
bonsai/bonsai-ollama/run_bonsai8b.sh
```

フォアグラウンドで以下を起動する（`Ctrl-C` で全部停止）:

- `127.0.0.1:11436` — bonsai-ollama-proxy（クライアントはここに繋ぐ）
- `127.0.0.1:11437` — 専用の `ollama serve`（gemma4/qwen 系はここに素通し。
  Ollama.app の 11434 とは別系統）
- `127.0.0.1:9988`  — Prism `llama-server`（Bonsai-8B をロード済み）

起動確認:

```bash
curl -s http://127.0.0.1:11436/api/generate -d '{
  "model": "bonsai-8b", "prompt": "1+1=", "stream": false
}'
```

## pipeline.py から使う

`OLLAMA_URL=http://127.0.0.1:11436` を指定し、`--model bonsai-8b` を渡す
（[[ollama-pipeline]] の e83dce1 で差し替え可能にしてある口をそのまま利用）。

```bash
# スモーク（Docker不要、生成だけ確認）
OLLAMA_URL=http://127.0.0.1:11436 python3 pipeline/pipeline.py --lang java --model bonsai-8b \
  --task cwe400_pair_sum --shots 0 --temperature 0.1 -k 1 --dry-run

# 本番スイープの1本
OLLAMA_URL=http://127.0.0.1:11436 python3 pipeline/pipeline.py --lang java --model bonsai-8b \
  --task cwe400_pair_sum --shots 0 --temperature 0.1 -k 10 \
  --report-dir reports/cwe400_pair_sum_bonsai8b_java_zeroshot_temp0.1
```

`pipeline.py` 側の対応（`model` が `bonsai` で始まる場合のみ発火、他モデルの挙動は不変）:

- `ensure_model()`: pull を試みない（プロキシが `BONSAI_GGUF` を直接ロード済みで、
  通常の ollama レジストリにはこの名前のモデルが存在しないため）。
- `generate()`: `num_predict=2048` を明示（プロキシ側の既定 512 だと関数コードが
  途中で切れるため）。

## サンプリング条件の注意（2026-09-16 追記）

プロキシ（`cmd/bonsai-ollama-proxy/main.go`）の元実装は Ollama の `options` のうち
`temperature` / `top_p`（既定 0.85）/ `num_predict` しか llama-server に転送しない。
そのため **repeat_penalty・top_k などは llama.cpp の既定（repeat_penalty=1.0＝無効）で動く**。
Ollama 側の他モデル（gemma4:e2b / qwen3.5:4b / qwen2.5-coder:1.5b）は Ollama 既定
（top_p 0.9 / top_k 40 / repeat_penalty 1.1 / repeat_last_n 64）と各 Modelfile のパラメータで
動いているので、2026-09-09〜10 の Bonsai-8B スイープ（2520世代）はこの点で条件が揃っていない。

対処として次を patch した:

- プロキシ: `forwardSamplingOptions()` を追加し、`options` にある `top_k` / `min_p` /
  `repeat_penalty` / `repeat_last_n` / `presence_penalty` / `frequency_penalty` / `seed` を
  そのまま llama-server に渡す（未指定なら従来どおり）。
- プロキシ: `BONSAI_LLAMA_EXTRA_ARGS`（例 `"--cache-ram 0"`）で llama-server に任意の引数を足せる。
- `pipeline.py`: `--options '<JSON>'` で生成 options を上書きでき、`result.md` のヘッダと
  再現コマンドに記録される。

Ollama 既定と揃えて回す例:

```bash
OLLAMA_URL=http://127.0.0.1:11436 python3 pipeline/pipeline.py --task cwe400_pair_sum \
  --lang java --model bonsai-8b -k 10 --temperature 0.1 --shots 0 \
  --options '{"top_p":0.9,"top_k":40,"repeat_penalty":1.1,"repeat_last_n":64}' \
  --report-dir reports/cwe400_pair_sum_bonsai-8b-parity_java_zeroshot_temp0.1
```

別サイズは `run_bonsai4b.sh`（`prism-ml/Bonsai-4B-gguf`, Q1_0, 572MB）を同じ要領で使う。
プロキシは1つの GGUF しか喋れないので、8B と 4B を同時には立てられない。
Bonsai-4B の cwe400/cwe401 720 世代の結果は `reports/SUMMARY_bonsai_4b.md`（func 0/360・2/360）。

**起動直後の罠**: プロキシは llama-server のポートが開いた時点で `listening` を出すが、
モデルロード中は `/api/generate` が `503 Loading model` を返す。スイープを流す前に
`curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:9988/health` が 200 になるまで待つ
（8B/4B で 10〜30 秒）。pipeline.py は 503 でその条件を落とすだけなので、`sweep_shots.sh` を
再実行すれば欠けた条件だけ埋まる。

## Bonsai-27B は不可（このマシンでは）

`prism-ml/Bonsai-27B-gguf`（Q1_0, 約3.5GB。PrismML公表値では4Kコンテキストでピーク約5.2GB）を
2026-09-12 にスモークテストした。緩和策（Bonsai-8Bスタック停止・Docker割当を4096→1536MiBに縮小・
`BONSAI_CTX=4096` でコンテキストを明示的に制限）を講じても、**トリビアルな3トークンのプロンプト
（`"1+1="`）が4分以上応答を返さなかった**（curl 60秒→180秒とも exit 28 timeout）。

原因は推定でメモリ不足によるスワッシング。ログ上は prompt processing 自体は
6秒/10トークン（1.64 tok/s）と遅いだけで完走しているが、その後の
`context checkpoint`（1個149.6MB、最大32個保持する機構、`llama_server: context checkpoints
enabled, max = 32`）の生成・管理でスワップが 5GB 前後に張り付き、生成（eval）フェーズに
一切進めなかった。`--cache-ram 0` でプロンプトキャッシュ自体を無効化する余地は未検証。

**結論: 8GB RAM のこのマシンでは Bonsai-27B は実用にならない。** 試すなら16GB以上のマシンか、
`--cache-ram 0` 等でキャッシュ機構を切った上での再検証が必要。
`bonsai/bonsai-ollama/run_bonsai27b.sh` は残してあるが、常用は推奨しない。

**`--cache-ram 0` の追試（2026-09-16）**: `BONSAI_LLAMA_EXTRA_ARGS="--cache-ram 0"` を付けて
再起動（BONSAI_CTX=4096、Docker 割当は 4096MiB のまま、他のモデルは停止）。今度は
モデルロード 31 秒で `/health` が 200 になり、`"1+1="`（16 トークン）には **142 秒で応答**した
（prompt eval 1.25 tok/s、**生成 0.12 tok/s = 1 トークン 8 秒**、スワップ使用 5.3〜5.7GB）。
つまり前回の「無応答」はスワップ下での極端な遅さで、`--cache-ram 0` でハングは解けるが
生成速度は実用外——関数 1 本（数百トークン）に 1 時間前後かかる計算で、200 トークンの
コード生成リクエストは 600 秒でタイムアウトした。context checkpoint（149.6MiB/個）は
`--cache-ram 0` でも作られる。結論は変わらず **8GB 機では不可**。
なお 27B の GGUF は `general.architecture=qwen35` でチャットテンプレートに `enable_thinking`
分岐があり、16 トークンの応答本文が空だった（thinking 側に出た可能性）。16GB 以上で
試すなら `enable_thinking=false` 相当の制御も必要になる。


テスト後、停止していた Bonsai-8B スタックと Docker のメモリ割当（4096MiBへ復元済み）は
元に戻した。

## 既知の制約

- プロキシは起動時に固定した1つの GGUF しか喋れない（`BONSAI_GGUF` で固定）。
  Bonsai の別サイズ（4B等）を同時に試すには、別ポートでプロキシをもう一系統
  立てて `OLLAMA_URL` を切り替える必要がある。
- RAM 8GBの実機では Bonsai-8B（1.16GB）+ llama-server 常駐 + Docker(dyntest-*)
  同時実行でメモリ圧迫の可能性がある。詰まる場合は `pipeline.py` 側の
  `--memory 512m` 隔離枠と競合していないか確認する。

## 関連

- [[ollama-pipeline]] — `OLLAMA_URL` 差し替えの仕組み
- [[mini-coder-hypothesis]] — Bonsai-8B アームを追加する動機になった検証
