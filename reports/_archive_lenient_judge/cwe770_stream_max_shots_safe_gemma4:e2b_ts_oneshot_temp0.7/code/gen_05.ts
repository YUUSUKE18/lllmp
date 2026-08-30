import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        const num = parseInt(line, 10);
        // チェック: 数値として解釈できるか、64bit範囲か
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
