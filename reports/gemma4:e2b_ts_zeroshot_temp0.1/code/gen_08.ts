import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数として解釈できるかチェック
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する (合計は64bitに収まるため、標準のnumber型で十分だが、念のためBigInt的な処理を意識してsumを計算)
    let count = 0;
    let sum: bigint = 0n; // 合計を安全のためにBigIntで保持

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
