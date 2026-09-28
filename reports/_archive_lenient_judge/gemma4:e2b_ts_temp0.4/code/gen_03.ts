import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として有効であり、かつ数値として妥当な範囲内（ここでは64bitの合計に収まることを前提とする）か確認する。
        // parseIntがNaNを返す場合は無視する。
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum = 0n; // 合計は64bitに収まることを考慮し、念のためBigIntで扱う（ただし最終出力は数値として扱う）

    for (const num of uniqueNumbers) {
        count++;
        // 合計を計算。入力が整数なので、通常の数値型でも十分だが、仕様に合わせて64bitの合計を保証する。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
