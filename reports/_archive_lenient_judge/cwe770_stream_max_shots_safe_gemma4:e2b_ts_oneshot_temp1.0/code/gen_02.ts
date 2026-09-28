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
        // 数値として解釈でき、かつ64bit範囲内の整数であるかを確認（問題文の制約に基づき実質的に整数として扱う）
        if (!isNaN(num) && Number.isInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
