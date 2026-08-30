/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 数値として解釈可能かチェックし、整数に変換する
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求めるために Set を使用
    const uniqueNumbers = Array.from(new Set(numbers));

    let count = 0;
    let sum = 0n; // 合計が64bitに収まることを考慮し、安全のためBigIntを使用（ただし、問題文の制約からNumberでも十分な場合が多いが、念のため）

    for (const num of uniqueNumbers) {
        count++;
        // 合計は64bit範囲に収まるとあるため、標準的なJavaScriptのNumber型（53bit整数精度）で十分だが、安全のためBigIntとして計算する。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
