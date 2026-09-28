import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const parts = input.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            // 値が64bit整数の範囲に収まることを前提とする（JavaScriptのNumber型はIEEE 754倍精度で約16桁の整数を正確に扱える）
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
