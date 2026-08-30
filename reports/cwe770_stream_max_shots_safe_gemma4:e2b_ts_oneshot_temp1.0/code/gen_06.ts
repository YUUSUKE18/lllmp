import * as process from "process";
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

let input = "";

rl.on("line", (line) => {
    input = line;
});

rl.on("close", () => {
    // カンマで分割し、前後の空白をトリムする
    const parts = input.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        if (part === "") continue; // 空要素は無視

        // 数値として解釈可能かチェック（整数のみを想定）
        const num = parseInt(part.trim(), 10);
        if (!isNaN(num)) {
            // 値が64bit整数の範囲内であることのチェックは、JavaScriptの標準Number型で十分に対応できるため、ここでは厳密な安全チェックよりも実用性を優先する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValidInput = true;
        }
    }

    // 整数として解釈できなかった要素は無視される（ループ内で既に処理済み）
    // 最終的な出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
});
