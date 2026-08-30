import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let distinctNumbers: Set<number> = new Set();
    let totalSum: bigint = 0n;

    for (const part of parts) {
        // 前後の空白を除去して整数としてパースを試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        // 数値に変換でき、かつ有効な整数であるかを確認
        if (!isNaN(num) && String(num) === trimmedPart) {
            distinctNumbers.add(num);
        }
    }

    // 重複を除いた要素の個数と合計を計算する
    let count = distinctNumbers.size;
    let sum = 0n;

    for (const num of distinctNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
