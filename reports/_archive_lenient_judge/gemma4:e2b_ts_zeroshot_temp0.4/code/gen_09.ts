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
    let sum = 0;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、NaNでないことを確認する
        if (!isNaN(num)) {
            // 問題文の制約から、64bit整数に収まることが保証されているが、
            // 数値型としては標準のnumber型で十分。
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数と合計を計算する
    const count = uniqueNumbers.size;
    let totalSum = 0;

    for (const num of uniqueNumbers) {
        totalSum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${totalSum}`);
}

solve();
