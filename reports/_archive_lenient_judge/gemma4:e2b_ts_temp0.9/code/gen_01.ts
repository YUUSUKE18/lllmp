import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart) {
            const num = parseInt(trimmedPart, 10);
            // 整数として解釈でき、かつNaNでないことを確認
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を取得し、Setを使用
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まるため、BigIntを使用（念のため）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
