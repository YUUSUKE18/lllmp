import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    const parts = input.split(',');
    let totalCount = 0n;
    let totalSum = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (!trimmedPart) continue;

        const colonIndex = trimmedPart.indexOf(':');
        if (colonIndex === -1) continue;

        const valueStr = trimmedPart.substring(0, colonIndex);
        const countStr = trimmedPart.substring(colonIndex + 1);

        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // 値が有効な整数であり、回数が0以上であるか確認
        if (!isNaN(value) && !isNaN(count) && count >= 0) {
            // 要素数と合計を64bit整数（BigInt）で計算
            totalCount += BigInt(count);
            totalSum += BigInt(value) * BigInt(count);
        }
    }

    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
