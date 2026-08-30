import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart) {
            // 整数として解釈できるかチェックし、変換する
            const num = parseInt(trimmedPart, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数のみを抽出する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、安全のためBigIntを使用（ただし、問題の制約上は通常のnumberでも十分だが、念のため）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
