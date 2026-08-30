import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*|\n/).filter(line => line.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマ区切りの文字列を分割し、整数として処理する
        const parts = line.split(',').map(s => s.trim());

        for (const part of parts) {
            if (part.length > 0) {
                const num = parseInt(part, 10);
                // 整数として解釈でき、64bit範囲内（JavaScriptのNumber型で十分）
                if (!isNaN(num)) {
                    count++;
                    if (num > maxValue) {
                        maxValue = num;
                    }
                }
            }
        }
    }

    // 厳密に 1 行だけ出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
