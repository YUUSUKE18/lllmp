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

        const valueStr = part.substring(0, colonIndex);
        const countStr = part.substring(colonIndex + 1);

        const value = parseInt(valueStr.trim(), 10);
        const count = parseInt(countStr.trim(), 10);

        // 値と回数が有効な整数であるか確認
        if (!isNaN(value) && !isNaN(count)) {
            // 回数が0以上であることを確認（仕様上は回数は0以上）
            if (count >= 0) {
                // 要素数に加算
                totalCount += BigInt(value) * BigInt(count);
                // 合計に加算
                totalSum += BigInt(value) * BigInt(count);
            }
        }
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
