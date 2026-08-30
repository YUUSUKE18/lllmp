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

        // カンマ区切りで整数をパースする
        const parts = line.split(',');
        for (const part of parts) {
            if (part) {
                const num = parseInt(part, 10);
                if (!isNaN(num)) {
                    count++;
                    if (num > maxValue) {
                        maxValue = num;
                    }
                }
            }
        }
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
