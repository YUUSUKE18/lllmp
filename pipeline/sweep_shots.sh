#!/bin/sh
# zero/one/few-shot × go/ts/java × temp{0.1,0.4,0.7,1.0} を k=10 で回し、
# reports/<task_>?<model>_<lang>_<shotlabel>_temp<t>/ に result.md + code/ を出力する（冪等）。
#
# 使い方:
#   sh pipeline/sweep_shots.sh [MODEL] [--think]
#   TASK=<タスク名>    で対象タスクを切り替える（既定 cwe400_unique）。
#   SHOTSET=<名前>     で例示セットを切り替える（既定 shots.json。shots_safe / shots_unsafe）。
#   PROMPT=<セット名>  でプロンプトセットを切り替える（既定 default。pipeline/prompts.json）。
#   SHOT_LEVELS="..."  で回す shot 数を絞る（既定 "0:zeroshot 1:oneshot 3:fewshot"）。
#   LANGS="go ts"      で言語を絞る（既定 "go ts java"）。
#   TEMPS="0.1"        で温度を絞る（既定 "0.1 0.4 0.7 1.0"）。
#   例) sh pipeline/sweep_shots.sh gemma4:e2b
#       TASK=cwe770_stream_max sh pipeline/sweep_shots.sh qwen3.5:4b
#       TASK=cwe770_stream_max SHOTSET=shots_safe SHOT_LEVELS="1:oneshot 3:fewshot" \
#         sh pipeline/sweep_shots.sh gemma4:e2b
#       TASK=cwe400_pair_sum PROMPT=safety_hint sh pipeline/sweep_shots.sh gemma4:e2b
set -u
MODEL="${1:-gemma4:e2b}"
TASK="${TASK:-cwe400_unique}"
SHOTSET="${SHOTSET:-}"
PROMPT="${PROMPT:-}"
SHOT_LEVELS="${SHOT_LEVELS:-0:zeroshot 1:oneshot 3:fewshot}"
THINK=""
TSUF=""
# think を有効にすると既定の num_ctx=8192 では thinking が予算を使い切って response が空になり、
# HTTP タイムアウト 600 秒でも 1 世代を待てない。--think のときだけ両方を広げる。
# （詳細: reports/SUMMARY_qwen3.5_4b_thinking.md）
THINKOPTS=""
if [ "${2:-}" = "--think" ]; then
  THINK="--think"; TSUF="_think"
  THINKOPTS='--options {"num_ctx":16384}'
  export OLLAMA_TIMEOUT="${OLLAMA_TIMEOUT:-1800}"
fi
K=10

# 取得済み CWE-400 の36条件をそのまま活かすため、既定タスクだけは従来の平坦な
# ディレクトリ名を維持し、それ以外はタスク名を前置して衝突を避ける。
if [ "$TASK" = "cwe400_unique" ]; then PREFIX=""; else PREFIX="${TASK}_"; fi

# 例示セットも同様に、既定セットのときだけ名前を増やさない。
if [ -n "$SHOTSET" ]; then
  PREFIX="${PREFIX}${SHOTSET}_"
  SHOTSFLAG="--shots-file $SHOTSET"
else
  SHOTSFLAG=""
fi

# プロンプトセットも同様（既定 default のときはディレクトリ名を変えない）。
if [ -n "$PROMPT" ] && [ "$PROMPT" != "default" ]; then
  PREFIX="${PREFIX}${PROMPT}_"
  PROMPTFLAG="--prompt $PROMPT"
else
  PROMPTFLAG=""
fi
cd "$(dirname "$0")/.." || exit 1
TMPRC=$(mktemp)
trap 'rm -f "$TMPRC"' EXIT INT TERM

# "shots:label" の対応
for pair in $SHOT_LEVELS; do
  shots="${pair%%:*}"; label="${pair##*:}"
  for lang in ${LANGS:-go ts java}; do
    for t in ${TEMPS:-0.1 0.4 0.7 1.0}; do
      dir="reports/${PREFIX}${MODEL}_${lang}_${label}_temp${t}${TSUF}"
      if [ -f "$dir/result.md" ]; then
        echo "################  SKIP (既完了): $dir  ################"
        continue
      fi
      echo "################  $MODEL $TASK $lang $label temp=$t  ->  $dir  ################"
      # exit 2 = 環境エラー(Docker 不達等)。無効な結果を積み上げないよう全体を止める。
      # パイプ越しだと python の終了コードが取れないので $? を退避して判定する。
      { python3 pipeline/pipeline.py --task "$TASK" --lang "$lang" --model "$MODEL" \
            -k "$K" --temperature "$t" --shots "$shots" $SHOTSFLAG $PROMPTFLAG $THINK $THINKOPTS \
            --report-dir "$dir" 2>&1; \
        echo "__RC=$?" >&3; } 3>"$TMPRC" | grep -v MallocStackLogging
      rc=$(sed -n 's/^__RC=//p' "$TMPRC")
      if [ "$rc" = "2" ]; then
        echo "########  ABORT: 環境エラーで中断 ${dir} / Docker を確認して再実行してください  ########"
        rm -f "$TMPRC"
        exit 2
      fi
    done
  done
done
echo "########  SHOT SWEEP DONE ($MODEL / $TASK) ########"
