#!/bin/sh
# end-to-end 検証: 実ランナーイメージ(run.sh entrypoint)を通してビルド→計測まで動かす。
set -u
DEMO="$(cd "$(dirname "$0")" && pwd)"

# 入力生成（input_generator の実体化に相当）
python3 -c "import sys;sys.stdout.write('1,2,3,4,5')" > /tmp/small.txt
python3 -c "import sys;sys.stdout.write(','.join(map(str,range(200000))))" > /tmp/big.txt
for d in go-safe go-vuln ts java; do cp /tmp/small.txt "$DEMO/$d/small.txt"; cp /tmp/big.txt "$DEMO/$d/big.txt"; done

# 共通の隔離フラグ（本番は run.py が付与する想定）
ISO="--rm --network none --memory 512m --memory-swap 512m --pids-limit 256"

decode() {  # JSON を読みやすく整形（stdout を base64 デコード）
  python3 - "$1" <<'PY'
import sys,json,base64
j=json.loads(sys.argv[1])
m=j.get("measure")
line=f'build_ok={j["build_ok"]}'
if m:
    out=base64.b64decode(m.get("stdout_b64","")).decode("utf-8","replace").strip()
    line+=(f' exit={m["exit_code"]} timed_out={m["timed_out"]} oom={m["oom_killed"]}'
           f' wall={m["wall_s"]}s rss={m["peak_rss_kb"]}KB | out="{out}"')
print("   "+line)
PY
}

run() { # img label timeout source_dir input_file
  img="$1"; label="$2"; to="$3"; src="$4"; inp="$5"
  echo "● $label  [$img]"
  json="$(docker run $ISO \
    -v "$src":/work \
    -e LABEL="$label" -e TIMEOUT_S="$to" -e INPUT_FILE=/work/"$inp" \
    "$img")"
  decode "$json"
}

echo "==================== Go ===================="
run dyntest-go  "func_small (safe)"      10 "$DEMO/go-safe" small.txt
run dyntest-go  "avail_big  (safe)"      10 "$DEMO/go-safe" big.txt
run dyntest-go  "avail_big  (VULN O(n^2))" 5 "$DEMO/go-vuln" big.txt
echo "==================== TS ===================="
run dyntest-ts  "func_small (safe)"      10 "$DEMO/ts" small.txt
echo "==================== Java ===================="
run dyntest-java "func_small (safe)"     10 "$DEMO/java" small.txt
