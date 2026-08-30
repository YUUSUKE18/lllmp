import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*|\n/).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマで分割し、各要素を整数に変換しようとする
        const parts = line.split(',');
        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart.length === 0) continue;

            // 整数として解釈できるかチェック
            const num = parseInt(trimmedPart, 10);
            if (!isNaN(num)) {
                // 値が64bit整数の範囲内であるという制約は、JavaScriptの標準Number型で十分に扱えるため、ここでは単純に最大値を更新する
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 厳密に1行だけ出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
