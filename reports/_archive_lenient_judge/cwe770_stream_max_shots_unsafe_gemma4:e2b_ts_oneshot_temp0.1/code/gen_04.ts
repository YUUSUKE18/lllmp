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
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ64bitの範囲内であるかを確認（ここでは単純にNaNチェックと数値比較で対応）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様では「カンマ区切りの整数列を受け取る」ため、入力された全ての数値の数を数えるのではなく、
    // 有効な整数要素の数を数えるのが自然と解釈する。

    // 再度、より厳密に「整数として解釈できた要素」のみをカウントし直す（例1のロジックを踏襲）
    let finalCount = 0;
    let finalMaxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            finalCount++;
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    }


    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
