#!/bin/sh
# モデルについて go/ts/java × temp 0.1..1.0 (0.1刻み) を k=10 で回し、
# 各結果を reports/<model>_<lang>_temp<t>/ に result.md + code/ で出力する。
#
# 使い方:
#   sh pipeline/sweep.sh [MODEL] [--think]
#   例) sh pipeline/sweep.sh gemma4:e2b
#       sh pipeline/sweep.sh qwen3.5:4b
#       sh pipeline/sweep.sh qwen3.5:4b --think
set -u
MODEL="${1:-gemma4:e2b}"
THINK=""
SUFFIX=""
[ "${2:-}" = "--think" ] && { THINK="--think"; SUFFIX="_think"; }
K=10
cd "$(dirname "$0")/.." || exit 1

for lang in go ts java; do
  for t in 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0; do
    dir="reports/${MODEL}_${lang}_temp${t}${SUFFIX}"
    if [ -f "$dir/result.md" ]; then
      echo "################  SKIP (既完了): $dir  ################"
      continue
    fi
    echo "################  model=$MODEL lang=$lang temp=$t think=${THINK:-off}  ->  $dir  ################"
    python3 pipeline/pipeline.py --lang "$lang" --model "$MODEL" \
        -k "$K" --temperature "$t" $THINK --report-dir "$dir" 2>&1 \
      | grep -v MallocStackLogging
  done
done
echo "########  SWEEP DONE ($MODEL) ########"
