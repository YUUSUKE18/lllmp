import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として解釈でき、かつ数値として妥当なもののみを格納する（ここでは単純にparseIntの結果を採用）
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数リストを作成
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮しBigIntを使用（安全のため）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
