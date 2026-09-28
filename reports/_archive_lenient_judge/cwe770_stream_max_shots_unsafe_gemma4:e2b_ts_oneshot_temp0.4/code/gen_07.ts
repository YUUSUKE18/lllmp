import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムして整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値の比較で対応）
        if (!isNaN(num)) {
            count++;
            hasValidNumber = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 有効な数値が見つからなかった場合は、count=0, max=適切な値（ここでは-1や0など、仕様に依存するが、最大値が存在しない場合の一般的な扱いを考慮。ここでは読み込んだ有効な数があればそれを採用）
    // 課題の文脈から、入力された整数列から計算されるため、もし何も数値がなければ count=0, max=? となる。
    // 数値がない場合は maxValue の初期値 (-Infinity) が残るが、count は 0 になる。
    if (!hasValidNumber) {
        // 入力に有効な整数が一つもなかった場合、count=0, max=適切な値。最大値が存在しないため、ここでは count=0 を優先する。
        // ただし、もし入力が空文字列やカンマのみだった場合、count=0 となる。
        maxValue = 0; // 数値がない場合のデフォルト値として0を採用（問題文の制約に厳密に従う）
    }


    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
