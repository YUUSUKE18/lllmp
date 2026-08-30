import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値としての妥当性を重視）
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型が通常扱う範囲内であれば満たされるため、
            // ここでは単に最大値を更新する処理を行う。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
