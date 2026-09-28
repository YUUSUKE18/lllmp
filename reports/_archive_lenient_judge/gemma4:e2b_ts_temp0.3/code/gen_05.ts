import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        // 前後の空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈できるかチェック
        const num = Number(trimmedPart);
        if (!isNaN(num)) {
            // 整数として有効な場合、Setに追加し、合計を計算する
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた要素の個数と合計を計算する
    const count = uniqueNumbers.size;
    let totalSum: bigint = 0n;

    for (const num of uniqueNumbers) {
        totalSum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
