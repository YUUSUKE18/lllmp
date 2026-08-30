import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値の比較で対応）
        if (!isNaN(num)) {
            count++;
            hasValidNumber = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できなかった要素や空要素は無視される。
    // 読み込んだ有効な整数の数と最大値を計算する。
    if (count === 0) {
        // 有効な整数が一つもなかった場合、仕様に厳密に従うため、ここでは何を出力するかを定義する必要があるが、
        // 例として、入力が空または無効な場合でも形式に従って出力する。
        // ただし、最大値の初期値(-Infinity)とカウント(0)をそのまま出力する。
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
