import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈する
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、かつ64bit範囲内であるか確認（ここでは単純にNumberで扱う）
        if (!isNaN(num) && isFinite(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
