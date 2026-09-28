import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    const parts = input.split(',');
    let totalCount = 0n;
    let totalSum = 0n;

    for (const part of parts) {
        if (part.includes(':')) {
            const [valueStr, countStr] = part.split(':');
            const value = parseInt(valueStr.trim(), 10);
            const count = parseInt(countStr.trim(), 10);

            // 値が有効で、回数が0以上であることを確認
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                const countBigInt = BigInt(count);
                
                totalCount += BigInt(value) * countBigInt;
                totalSum += BigInt(value) * BigInt(count);
            }
        }
    }

    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
