#!/bin/sh
# Go ランナー: 組立済みソース(/work)をビルド → measure.sh で計測。
# オーケストレータが /work に main.go（driver + 生成関数を結合）を配置し、
# 入力ファイルと環境変数を渡す前提。
#
#   INPUT_FILE  : 関数へ渡す入力（プログラムの stdin に流す）。既定 /work/input.txt
#   TIMEOUT_S   : 実行時間上限（秒）。既定 10
#   LABEL       : テストケース識別子
#
# 出力: {"build_ok":bool, ...} の JSON を stdout へ（schema/result_schema.json）。
set -u
: "${TIMEOUT_S:=10}"
: "${INPUT_FILE:=/work/input.txt}"
: "${LABEL:=case}"
cd /work || exit 1

[ -f go.mod ] || go mod init prog >/dev/null 2>&1

if ! go build -o /work/prog ./... 2>/work/build.err; then
  printf '{"label":"%s","build_ok":false,"build_err_b64":"%s"}\n' \
    "$LABEL" "$(base64 < /work/build.err | tr -d '\n')"
  exit 0
fi

m="$(/opt/measure/measure.sh --timeout "$TIMEOUT_S" --label "$LABEL" -- /work/prog < "$INPUT_FILE")"
printf '{"label":"%s","build_ok":true,"measure":%s}\n' "$LABEL" "$m"
