import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか、かつ64bitの範囲内かを確認（ここでは単純にNaNチェックと数値としての妥当性を確認）
        if (!isNaN(num)) {
            validCount++;
            // 最大値を更新
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最終的な結果を出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
