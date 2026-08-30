import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    const parts = input.split(',');

    let totalCount = 0;
    let totalSum = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (!trimmedPart) {
            continue;
        }

        const colonIndex = trimmedPart.indexOf(':');
        if (colonIndex === -1) {
            continue;
        }

        const valueStr = trimmedPart.substring(0, colonIndex);
        const countStr = trimmedPart.substring(colonIndex + 1);

        // 値が有効な整数かチェック
        if (!isNaN(parseInt(valueStr, 10))) {
            const value = parseInt(valueStr, 10);
            const count = parseInt(countStr, 10);

            // 回数が0以上かチェック
            if (count >= 0) {
                totalCount += count;
                totalSum += value * count;
            }
        }
    }

    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
