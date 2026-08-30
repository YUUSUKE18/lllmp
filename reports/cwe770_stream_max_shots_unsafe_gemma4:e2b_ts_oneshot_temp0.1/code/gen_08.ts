import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasNumbers = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではparseIntの範囲に依存するが、問題文の制約に従う）
        if (!isNaN(num)) {
            count++;
            hasNumbers = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できなかった要素や空要素は無視される。
    // 要素数と最大値を計算する。
    // もし数値が一つもなかった場合、count=0, maxValue=-Infinityとなるが、
    // 問題の文脈から「要素数」と「最大値」を求めるため、入力された有効な整数のみを考慮する。

    if (count === 0) {
        // 数値が一つもなかった場合の処理。ここでは、もし入力に数値がなければ count=0, max=? となるが、
        // 厳密には「要素数」と「最大値」を求めるため、有効な数値のセットに基づいて計算する。
        // 入力されたカンマ区切りの整数列から抽出した有効な整数の個数と最大値を返す。
        process.stdout.write(`count=0 max=-Infinity\n`); // 数値が一つもなかった場合
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
