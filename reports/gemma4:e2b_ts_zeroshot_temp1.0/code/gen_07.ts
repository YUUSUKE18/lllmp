import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();

    for (const part of parts) {
        // 空白や非数値を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ重複していないかチェックする
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数と合計を計算する
    let count = uniqueNumbers.size;
    let sum = 0;

    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
