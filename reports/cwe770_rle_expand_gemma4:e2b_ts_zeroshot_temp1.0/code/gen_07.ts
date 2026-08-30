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

        const partsValue = part.split(':');
        if (partsValue.length !== 2) {
            continue;
        }

        const valueStr = partsValue[0].trim();
        const countStr = partsValue[1].trim();

        // 数値としてパース
        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // 値が数値で、回数が0以上であることを確認
        if (!isNaN(value) && !isNaN(count) && count >= 0) {
            // 要素数と合計を計算 (64bit/BigIntを使用)
            totalCount += BigInt(count);
            totalSum += BigInt(value) * BigInt(count);
        }
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
