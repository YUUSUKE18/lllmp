#!/usr/bin/env bash
# lllmp 用: Bonsai-8B(1-bit, Q1_0) を bonsai-ollama プロキシ経由で立ち上げる。
# 素の Ollama は Q1_0 を読めないため、Prism の llama-server に生成だけ委譲する。
# 使い方: ./run_bonsai8b.sh  (フォアグラウンドで起動。Ctrl-C で全プロセス停止)
#        別ターミナルから OLLAMA_URL=http://127.0.0.1:11434 で
#        pipeline/pipeline.py --model bonsai-8b ... を叩く。
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export BONSAI_GGUF="$ROOT/models/bonsai-8b/Bonsai-8B-Q1_0.gguf"
export BONSAI_PRISM_LIB_DIR="$ROOT/vendor/prism-llama/llama-prism-b9570-0ad1dab"

# 既定ポート(11434/11435)は Ollama.app が常駐で使っているため衝突を避けて
# 別ポート系統で立てる。呼び出し側は OLLAMA_URL=http://127.0.0.1:11436 を指定する。
export BONSAI_PROXY_LISTEN="127.0.0.1:11436"
export BACKEND_PORT="11437"

exec "$ROOT/bin/run.sh"
