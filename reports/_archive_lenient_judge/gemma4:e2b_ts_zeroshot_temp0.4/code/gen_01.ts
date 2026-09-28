import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
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
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、重複を除いた整数であるか確認する
        if (!isNaN(num)) {
            // 整数として解釈できた場合、Setに追加し、合計を計算する
            uniqueNumbers.add(num);
            sum += BigInt(num);
        }
    }

    const count = uniqueNumbers.size;
    const totalSum = sum;

    // 結果を出力する
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
