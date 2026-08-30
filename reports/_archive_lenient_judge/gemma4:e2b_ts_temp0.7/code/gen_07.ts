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
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ重複がないか確認する
        if (!isNaN(num)) {
            // 問題の制約（64bit整数に収まる）を考慮し、通常のJavaScriptのnumber型で十分だが、
            // 合計は大きな値になる可能性があるためBigIntを使用する。
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数と合計を計算する
    let count = uniqueNumbers.size;
    let totalSum: bigint = 0n;

    for (const num of uniqueNumbers) {
        totalSum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
