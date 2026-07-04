#!/bin/sh
# TypeScript ランナー: /work/main.ts を tsc でビルド → node で実行・計測。
# 規約は go/run.sh と共通（INPUT_FILE / TIMEOUT_S / LABEL）。
set -u
: "${TIMEOUT_S:=10}"
: "${INPUT_FILE:=/work/input.txt}"
: "${LABEL:=case}"
cd /work || exit 1

# tsc は診断を stdout に出すため stdout も build.err へ寄せ、コンテナ stdout を JSON 専用に保つ。
# グローバル導入した @types/node を typeRoots で解決し、ドライバの process/Buffer を型付け。
TYPEROOTS="$(npm root -g)/@types"
if ! tsc --target es2020 --module commonjs --skipLibCheck \
        --types node --typeRoots "$TYPEROOTS" \
        main.ts >/work/build.err 2>&1; then
  printf '{"label":"%s","build_ok":false,"build_err_b64":"%s"}\n' \
    "$LABEL" "$(base64 < /work/build.err | tr -d '\n')"
  exit 0
fi

m="$(/opt/measure/measure.sh --timeout "$TIMEOUT_S" --label "$LABEL" -- node /work/main.js < "$INPUT_FILE")"
printf '{"label":"%s","build_ok":true,"measure":%s}\n' "$LABEL" "$m"
