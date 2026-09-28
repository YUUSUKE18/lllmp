import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、NaNではないことを確認する（非整数要素は無視）
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める (Setを使用)
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計は64bit整数に収まる可能性があるため、BigIntを使用（念のため）

    for (const num of uniqueNumbers) {
        count++;
        // 合計は大きな値になる可能性があるが、仕様上64bitに収まることを前提とする。
        // 標準のJavaScript Number型でも安全だが、厳密性を保つためBigIntで計算し、最終的に出力する。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
