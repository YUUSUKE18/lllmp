/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるかチェックし、変換する
        const num = Number(trimmedPart);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求めるために Set を使用する
    const uniqueNumbers = Array.from(new Set(numbers));

    let count: number = 0;
    let sum: bigint = 0n; // 合計は64bit整数に収まるため、安全のためBigIntを使用（仕様上は64bit整数範囲なのでNumberでも可能だが、念のため）

    for (const num of uniqueNumbers) {
        count++;
        // 合計を計算。入力が大きくなる可能性があるため、sumもBigIntとして扱う
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
