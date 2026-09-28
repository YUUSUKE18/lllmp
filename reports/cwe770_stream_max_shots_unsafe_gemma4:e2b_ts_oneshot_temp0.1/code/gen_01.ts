import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値の比較で対応）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合（仕様上は空の出力になるが、ここでは安全のため）
        // 空の入力に対しては count=0 max=... の形式で出力する
        process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値。ここでは最大値が存在しないため -Infinity を使用
    }
}

solve();
