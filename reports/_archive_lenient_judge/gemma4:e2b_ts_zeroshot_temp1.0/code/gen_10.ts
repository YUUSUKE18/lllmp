import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を数値に変換しようと試みる
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let totalSum = 0n; // 64bit整数として扱うため BigInt を使用 (合計が大きくなる可能性があるため)

    for (const part of parts) {
        // 前後の空白を無視して数値に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        const num = Number(trimmedPart);

        // 整数として解釈できるか確認
        if (!isNaN(num)) {
            // 整数であるか確認（浮動小数点数の可能性を排除）
            if (Number.isInteger(num)) {
                uniqueNumbers.add(num);
            }
        }
    }

    let count = uniqueNumbers.size;
    let sum = 0n;

    // 重複を除いた整数たちの合計を計算
    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
