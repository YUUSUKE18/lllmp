import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、Setに追加可能かチェックする
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数を計算する
    const count = uniqueNumbers.size;

    // 合計を計算する
    uniqueNumbers.forEach(num => {
        sum += num;
    });

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
