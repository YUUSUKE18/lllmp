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
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            // 値が64bit整数に収まることを前提とする（JavaScriptのNumber型はIEEE 754倍精度だが、ここでは問題の制約に従う）
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 空要素や非整数を無視した後のカウントと最大値を計算する。
    // 仕様では「カンマ区切りの整数列を受け取る」ため、入力文字列全体を解析し、有効な整数のみを数える必要がある。
    // 再度、より厳密に処理を行う。

    let finalCount = 0;
    let finalMaxValue = -Infinity;

    const tokens = input.split(',');

    for (const token of tokens) {
        const trimmedToken = token.trim();
        if (trimmedToken === "") continue;

        const num = parseInt(trimmedToken, 10);

        // 整数として解釈できるかチェック
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
