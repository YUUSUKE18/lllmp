import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const part of parts) {
        // 前後の空白は無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、かつ重複していないか確認する
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数を求める
    const count = uniqueNumbers.size;

    // 合計を計算する
    uniqueNumbers.forEach(num => {
        sum += num;
    });

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
