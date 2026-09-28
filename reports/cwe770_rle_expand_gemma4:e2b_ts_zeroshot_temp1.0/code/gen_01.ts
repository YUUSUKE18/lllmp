/**
 * 標準入力からランレングス圧縮列を受け取り、その要素数と合計を計算して出力するプログラム。
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

        const match = part.match(/^(\d+):(\d+)$/);
        if (match) {
            const value = parseInt(match[1], 10);
            const count = parseInt(match[2], 10);

            if (value >= 0 && count >= 0) {
                // 要素数: value * count
                totalCount += BigInt(value) * BigInt(count);
                // 合計: value * count
                totalSum += BigInt(value) * BigInt(count);
            }
        }
    }

    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
