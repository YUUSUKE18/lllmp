import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/);

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const line of lines) {
        if (line === "") continue;
        const num = parseInt(line, 10);
        // 整数として解釈でき、64bit範囲内であるかを確認（ここでは単純に数値として扱う）
        if (!isNaN(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
