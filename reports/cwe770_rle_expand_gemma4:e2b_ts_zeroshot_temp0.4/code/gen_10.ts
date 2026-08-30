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
        if (!part) continue;

        const match = part.match(/^(\d+):(\d+)$/);
        if (match) {
            const value = parseInt(match[1], 10);
            const count = parseInt(match[2], 10);

            if (isNaN(value) || isNaN(count) || count < 0) {
                continue;
            }

            // 要素数と合計を計算
            totalCount += BigInt(count);
            totalSum += BigInt(value) * BigInt(count);
        }
    }

    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
