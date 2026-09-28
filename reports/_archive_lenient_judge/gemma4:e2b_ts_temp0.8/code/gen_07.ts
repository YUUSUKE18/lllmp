import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 数値として解析を試みる。整数のみを対象とする。
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // 整数として有効な場合、重複を除いた集合に追加し、合計を計算する
            uniqueNumbers.add(num);
            sum += BigInt(num);
        }
    }

    const count = uniqueNumbers.size;
    // 合計は64bit整数に収まるが、BigIntで保持し、出力時に文字列化する
    const totalSum = sum; 

    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
