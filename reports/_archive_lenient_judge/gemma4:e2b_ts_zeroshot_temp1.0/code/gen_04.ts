import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n; // 合計は64bit整数 (BigInt) を想定
    let count: number = 0;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (!trimmedPart) {
            continue;
        }

        // 整数として解釈可能か試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、入力された文字列全体が数値に変換されたものと一致するか確認 (厳密性の確保のため)
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 重複を除いた整数として扱う
            if (!uniqueNumbers.has(num)) {
                uniqueNumbers.add(num);
                sum += BigInt(num);
                count++;
            }
        }
    }

    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
