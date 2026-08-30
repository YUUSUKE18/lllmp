import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/);

    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const line of lines) {
        if (line === "") continue;
        const numStr = line.trim();
        if (numStr) {
            const num = parseInt(numStr, 10);
            // チェック: 数値として解釈でき、64bitの範囲内であること（ここでは一般的なJSのNumber型で十分だが、念のため）
            if (!isNaN(num) && Number.isSafeInteger(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                hasValidNumber = true;
            }
        }
    }

    // 厳密に count=<個数> max=<最大値> を出力する
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
