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

    let numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を無視して数値として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できたかチェックし、NaNでなければ追加する
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求めるためのセットに変換
    const uniqueNumbers = new Set<number>(numbers);

    // 個数を計算
    const count = uniqueNumbers.size;

    // 合計を計算
    let sum: bigint = 0n; // 64bit以上の合計に対応するためBigIntを使用
    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
