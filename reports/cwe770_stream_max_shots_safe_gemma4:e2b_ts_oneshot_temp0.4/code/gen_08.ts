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
        if (!isNaN(num)) {
            // 値が64bit整数に収まることを前提とするが、ここでは単純に最大値を求める
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 空要素や非整数を無視した後のカウントと最大値を出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
