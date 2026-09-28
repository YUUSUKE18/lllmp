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

    let uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const part of parts) {
        // 前後の空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数として解釈できるかチェックし、変換する
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックで、整数として解釈できなかった場合（非整数を含む場合）を無視する
        if (!isNaN(num)) {
            // 合計が64bit範囲に収まることを前提とする（JavaScriptのNumber型はIEEE 754倍精度であり、安全性が高い）
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数と合計を計算する
    const count = uniqueNumbers.size;
    let totalSum = 0;

    for (const num of uniqueNumbers) {
        totalSum += num;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${totalSum}`);
}

solve();
