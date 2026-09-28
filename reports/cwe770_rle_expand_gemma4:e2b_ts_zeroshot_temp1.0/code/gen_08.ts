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
    let totalCount = 0n;
    let totalSum = 0n;

    for (const part of parts) {
        if (!part) continue;

        const colonIndex = part.indexOf(':');
        if (colonIndex === -1) continue;

        const valueStr = part.substring(0, colonIndex).trim();
        const countStr = part.substring(colonIndex + 1).trim();

        // 値が数値であり、回数が存在する場合のみ処理
        if (valueStr && countStr) {
            const value = parseInt(valueStr, 10);
            const count = parseInt(countStr, 10);

            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                // 要素数を加算
                totalCount += BigInt(count);
                
                // 合計を計算 (値 * 回数) を加算
                totalSum += BigInt(value) * BigInt(count);
            }
        }
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
