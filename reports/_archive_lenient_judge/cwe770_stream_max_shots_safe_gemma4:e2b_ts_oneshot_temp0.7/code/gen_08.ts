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

        // 整数として解釈可能かチェック
        if (/^-?\d+$/.test(trimmedPart)) {
            const num = parseInt(trimmedPart, 10);
            // 値が64bit整数の範囲に収まることを前提とする（JavaScriptのNumber型で十分）
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
