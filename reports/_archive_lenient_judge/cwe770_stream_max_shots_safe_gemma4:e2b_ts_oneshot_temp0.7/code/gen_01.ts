import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const parts = input.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 空白を無視
        if (part.length === 0) continue;

        const num = parseInt(part.trim(), 10);

        // 整数として解釈可能かチェック
        if (!isNaN(num)) {
            // 値が64bit整数の範囲に収まるか（ここではJavaScriptの標準Numberで十分だが、念のため）
            // 実際には問題文の制約に従うため、数値として処理する。
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 要素数と最大値を標準出力に出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
