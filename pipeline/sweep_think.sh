#!/bin/sh
# thinking アームの 18 条件を回す（qwen3.5:4b で取得済みのものと同一の条件集合）。
#   7 タスク × {go, java} × zero-shot × temp0.1
#   ＋ cwe400_pair_sum / cwe401_memo_retain のみ temp0.7 も
# = 18 条件 × k=10 = 180 世代。
#
# think は既定値のままでは成立しない（reports/SUMMARY_qwen3.5_4b_thinking.md 参照）:
#   - num_ctx=8192 だと thinking が予算を使い切って response が空になる → 16384 に広げる
#   - HTTP タイムアウト 600 秒では 1 世代を待てない → OLLAMA_TIMEOUT=1800
#
# 使い方:
#   nohup caffeinate -i sh pipeline/sweep_think.sh gemma4:e2b > /tmp/sweep_think.log 2>&1 &
#   LANGS=ts sh pipeline/sweep_think.sh gemma4:e2b          # 言語を絞る（既定 "go java"）
#   TASKS=cwe400_unique sh pipeline/sweep_think.sh gemma4:e2b   # タスクを絞る
# 条件単位で冪等（result.md があればスキップ）なので、落ちても再実行でよい。
set -u
MODEL="${1:-gemma4:e2b}"
K=10
OPTS='{"num_ctx":16384}'
export OLLAMA_TIMEOUT="${OLLAMA_TIMEOUT:-1800}"
cd "$(dirname "$0")/.." || exit 1

LANGS="${LANGS:-go java}"
TASKS="${TASKS:-cwe400_pair_sum cwe401_memo_retain cwe770_stream_max cwe770_rle_expand \
cwe1333_regex_validate cwe1333_regex_required cwe835_declared_count}"
# temp0.7 も取るタスク（qwen 側でそうなっているため合わせる）
TWO_TEMP="cwe400_pair_sum cwe401_memo_retain"

done_n=0
run() {  # run <task> <lang> <temp>
  # cwe400_unique は取得済み 36 条件が平坦名（タスク名を前置しない）なので、
  # think 版も同じ流儀に揃える。そうしないと OFF 側と対に並ばない。
  if [ "$1" = "cwe400_unique" ]; then pre=""; else pre="$1_"; fi
  dir="reports/${pre}${MODEL}_$2_zeroshot_temp$3_think"
  if [ -f "$dir/result.md" ]; then
    echo "################  SKIP (既完了): $dir  ################"
    return 0
  fi
  echo "################  $(date '+%m-%d %H:%M')  task=$1 lang=$2 temp=$3 think=on  ->  $dir  ################"
  stf=$(mktemp)
  # grep をパイプで挟むと $? が grep のものになるため、python 側の終了コードを別途拾う。
  { python3 pipeline/pipeline.py --task "$1" --lang "$2" --model "$MODEL" \
      -k "$K" --temperature "$3" --think --options "$OPTS" --report-dir "$dir" 2>&1
    echo $? > "$stf"; } | grep --line-buffered -v MallocStackLogging
  st=$(cat "$stf"); rm -f "$stf"
  # 2 = 環境エラー(Docker/ollama 不達)。続けても全条件を無駄に焼くので止める。
  if [ "$st" = "2" ]; then
    echo "########  ABORT: 環境エラー。Docker/ollama を復旧して再実行してください  ########"
    exit 2
  fi
  done_n=$((done_n + 1))
  echo "########  $(date '+%m-%d %H:%M')  完了 $dir （このセッションで $done_n 条件目）  ########"
}

for t in 0.1 0.7; do
  for task in $TASKS; do
    if [ "$t" = "0.7" ]; then
      case " $TWO_TEMP " in *" $task "*) ;; *) continue ;; esac
    fi
    for lang in $LANGS; do
      run "$task" "$lang" "$t"
    done
  done
done
echo "########  SWEEP DONE ($MODEL, think) $(date '+%m-%d %H:%M')  ########"
