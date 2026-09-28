/**
 * 標準入力からランレングス圧縮列を受け取り、要素数と合計を計算して出力するプログラム。
 * 入力形式: 値:回数,値:回数,...
 * 出力形式: count=<要素数> sum=<合計>
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    const parts = input.split(',');
    let totalCount = 0n;
    let totalSum = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (!trimmedPart) {
            continue;
        }

        const colonIndex = trimmedPart.indexOf(':');
        if (colonIndex === -1) {
            continue; // 値:回数 の形式でないものは無視
        }

        const valueStr = trimmedPart.substring(0, colonIndex);
        const countStr = trimmedPart.substring(colonIndex + 1);

        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // 値と回数が有効な整数であるかを確認
        if (isNaN(value) || isNaN(count)) {
            continue;
        }

        // 回数が0以上であることを確認 (仕様上は回数は0以上とあるが、念のため)
        if (count < 0) {
            continue;
        }

        // 要素数と合計を計算
        // 要素数: count
        // 合計: value * count
        totalCount += BigInt(count);
        totalSum += BigInt(value) * BigInt(count);
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
