import * as readline;

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 数値としてパースを試みる。isNaNやparseIntでチェックする。
        // ここでは、文字列が純粋な整数表現であるかを確認し、変換する。
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // parseIntは '123a' のような文字列も '123' を返すため、
            // 厳密に整数のみを扱うために、元の文字列が数値のみで構成されているか確認する。
            // ただし、仕様上「整数として解釈できない要素も無視」とあるため、
            // parseIntが成功したものを採用し、その値が有効な整数であるとみなす。

            // 念のため、元の文字列が数字のみで構成されていることを確認（オプションだが堅牢性を高める）
            if (String(num) === trimmedPart) {
                uniqueNumbers.add(num);
            }
        }
    }

    // 重複を除いた整数について個数と合計を計算する
    const count = uniqueNumbers.size;
    let totalSum = 0n;

    for (const num of uniqueNumbers) {
        totalSum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
