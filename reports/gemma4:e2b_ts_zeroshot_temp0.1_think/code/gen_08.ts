import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // 整数であり、NaNではないことを確認する
        if (!isNaN(num) && Number.isInteger(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 個数と合計を計算する
    const count = uniqueNumbers.size;
    
    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
