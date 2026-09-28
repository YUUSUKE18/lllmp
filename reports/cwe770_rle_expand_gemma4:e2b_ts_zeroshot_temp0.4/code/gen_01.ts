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

        // 値と回数をパース
        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // 値:回数 の形式で解釈できないものは無視される（仕様上、値が整数であると仮定）
        if (isNaN(value) || isNaN(count)) {
            continue;
        }

        // 回数が 0 以上であることを確認（仕様で保証されているが念のため）
        if (count < 0) {
            continue;
        }

        // 合計と要素数を計算
        totalCount += BigInt(count);
        totalSum += BigInt(value) * BigInt(count);
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
