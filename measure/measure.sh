#!/bin/sh
# 共通計測ラッパー（コンテナ内で実行）
#
# 計測を言語の外（OSレベル）で行うための層。timeout で実行時間を上限管理し、
# GNU /usr/bin/time -v で wall 時間と最大 RSS を取得する。対象が何語でも同一。
#
# 使い方:
#   measure.sh --timeout <sec> [--label <name>] -- <command> [args...]
#
# 出力: 計測結果 JSON を stdout へ（schema/result_schema.json の measure オブジェクト）。
#   プログラム自身の stdout/stderr は base64 で埋め込む（JSON エスケープ事故の回避）。
#
# 終了コードの規約（timeout が time の内側で動くため判別可能）:
#   124 -> タイムアウト（timeout が時間切れで返す既定コード）
#   137 -> OOM 等の SIGKILL（カーネル/Docker による kill。timeout 由来ではない）
set -u

TIMEOUT=10
LABEL=""

while [ $# -gt 0 ]; do
  case "$1" in
    --timeout) TIMEOUT="$2"; shift 2;;
    --label)   LABEL="$2";   shift 2;;
    --)        shift; break;;
    *) echo "measure.sh: unknown arg: $1" >&2; exit 2;;
  esac
done

if [ $# -eq 0 ]; then
  echo "measure.sh: no command given" >&2
  exit 2
fi

workdir="$(mktemp -d)"
timefile="$workdir/time.txt"
outfile="$workdir/stdout.txt"
errfile="$workdir/stderr.txt"
trap 'rm -rf "$workdir"' EXIT

# time が timeout をラップする並び。timeout が 124 で正常終了しても
# time のサマリ（time.txt）は必ず書かれる。プログラムの stdin は継承される。
#
# 既定の TERM で時間切れ → timeout は 124 を返す（タイムアウトの明確な印）。
# TERM を無視するプロセス向けに --kill-after で猶予後に KILL を送る。
# これにより 124=タイムアウト / 137=OOM等の SIGKILL を確実に判別できる。
/usr/bin/time -v -o "$timefile" \
  timeout --kill-after=5 "$TIMEOUT" "$@" \
  >"$outfile" 2>"$errfile"
exit_code=$?

timed_out=false
oom_killed=false
if [ "$exit_code" -eq 124 ]; then
  timed_out=true
elif [ "$exit_code" -eq 137 ]; then
  oom_killed=true
fi

# time -v からの抽出（取得できなければ 0）
peak_rss_kb="$(awk -F': ' '/Maximum resident set size/ {print $2; exit}' "$timefile")"
[ -z "$peak_rss_kb" ] && peak_rss_kb=0

wall_raw="$(awk -F': ' '/Elapsed \(wall clock\)/ {print $2; exit}' "$timefile")"
wall_s="$(awk -v t="$wall_raw" 'BEGIN{
  if (t=="") { print 0; exit }
  n=split(t,a,":");
  if      (n==3) printf "%.4f", a[1]*3600 + a[2]*60 + a[3];
  else if (n==2) printf "%.4f", a[1]*60 + a[2];
  else           printf "%.4f", a[1];
}')"

b64() { base64 < "$1" 2>/dev/null | tr -d '\n'; }

printf '{'
printf '"label":"%s",' "$LABEL"
printf '"timeout_s":%s,' "$TIMEOUT"
printf '"exit_code":%s,' "$exit_code"
printf '"timed_out":%s,' "$timed_out"
printf '"oom_killed":%s,' "$oom_killed"
printf '"wall_s":%s,' "$wall_s"
printf '"peak_rss_kb":%s,' "$peak_rss_kb"
printf '"stdout_b64":"%s",' "$(b64 "$outfile")"
printf '"stderr_b64":"%s"' "$(b64 "$errfile")"
printf '}\n'
