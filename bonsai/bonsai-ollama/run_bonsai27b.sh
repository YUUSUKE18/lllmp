#!/usr/bin/env bash
# lllmp 用: Bonsai-27B(1-bit, Q1_0, ~3.9GB) のスモークテスト用起動スクリプト。
# 8GBマシンでは常時稼働は非現実的なため、BONSAI_CTX でコンテキストを絞って
# ピークメモリを抑える(PrismML公表値: 4Kコンテキストでピーク約5.2GB)。
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export BONSAI_GGUF="$ROOT/models/bonsai-27b/Bonsai-27B-Q1_0.gguf"
export BONSAI_PRISM_LIB_DIR="$ROOT/vendor/prism-llama/llama-prism-b9570-0ad1dab"
export BONSAI_CTX="4096"

export BONSAI_PROXY_LISTEN="127.0.0.1:11436"
export BACKEND_PORT="11437"

exec "$ROOT/bin/run.sh"
