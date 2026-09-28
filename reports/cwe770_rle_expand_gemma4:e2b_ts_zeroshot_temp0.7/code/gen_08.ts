/**
 * 標準入力からランレングス圧縮列を受け取り、要素数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    const parts = input.split(',');
    let totalCount = 0n; // 64bit整数として扱うため BigInt を使用
    let totalSum = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (!trimmedPart) continue;

        const colonIndex = trimmedPart.indexOf(':');
        if (colonIndex === -1) continue;

        const valueStr = trimmedPart.substring(0, colonIndex);
        const countStr = trimmedPart.substring(colonIndex + 1);

        // 値と回数をパース
        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // '値:回数' の形式に厳密に一致するか確認（数値としてパースできたか）
        if (isNaN(value) || isNaN(count)) {
            continue;
        }

        // 回数が0以上であることを確認（仕様では回数は0以上）
        if (count < 0) {
            continue;
        }

        // 要素数と合計を計算（BigIntで加算）
        totalCount += BigInt(count);
        totalSum += BigInt(value) * BigInt(count);
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
