import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');
    const uniqueNumbers = new Set<number>();
    let totalSum = 0;

    for (const part of parts) {
        // 前後の空白を無視
        const trimmedPart = part.trim();

        // 空の要素は無視
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解析を試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として有効な値であるか確認
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
            totalSum += num;
        }
    }

    const count = uniqueNumbers.size;

    // 結果を出力
    console.log(`count=${count} sum=${totalSum}`);
}

solve();
