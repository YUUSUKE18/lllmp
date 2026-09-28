const fs = require('fs');

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
        if (trimmedPart === "") continue;

        const colonIndex = trimmedPart.indexOf(':');
        if (colonIndex === -1) continue;

        const valueStr = trimmedPart.substring(0, colonIndex).trim();
        const countStr = trimmedPart.substring(colonIndex + 1).trim();

        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        if (!isNaN(value) && !isNaN(count) && count >= 0) {
            const v = BigInt(value);
            const c = BigInt(count);
            totalCount += c;
            totalSum += v * c;
        }
    }

    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
