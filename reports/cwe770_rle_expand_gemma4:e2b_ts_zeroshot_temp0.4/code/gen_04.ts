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
    let totalCount = 0;
    let totalSum = 0;

    for (const part of parts) {
        if (!part) continue;

        const match = part.match(/^(\d+):(\d+)$/);
        if (match) {
            const value = parseInt(match[1], 10);
            const count = parseInt(match[2], 10);

            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                totalCount += count;
                totalSum += value * count;
            }
        }
    }

    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
