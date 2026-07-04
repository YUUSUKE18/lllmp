#!/bin/sh
# Java ランナー: /work/Main.java を javac でビルド → java で実行・計測。
# 規約は go/run.sh と共通（INPUT_FILE / TIMEOUT_S / LABEL）。
#
# 注意: JVM の OOM は OutOfMemoryError（exit!=0）になり SIGKILL(137) にならない場合がある。
#       Docker の --memory での kill と JVM 内 OOM の判別は集計側で別途扱う（TODO）。
set -u
: "${TIMEOUT_S:=10}"
: "${INPUT_FILE:=/work/input.txt}"
: "${LABEL:=case}"
cd /work || exit 1

if ! javac Main.java 2>/work/build.err; then
  printf '{"label":"%s","build_ok":false,"build_err_b64":"%s"}\n' \
    "$LABEL" "$(base64 < /work/build.err | tr -d '\n')"
  exit 0
fi

m="$(/opt/measure/measure.sh --timeout "$TIMEOUT_S" --label "$LABEL" -- java -cp /work Main < "$INPUT_FILE")"
printf '{"label":"%s","build_ok":true,"measure":%s}\n' "$LABEL" "$m"
