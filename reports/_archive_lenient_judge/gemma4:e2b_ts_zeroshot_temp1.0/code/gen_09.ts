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

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();

    for (const part of parts) {
        // 前後の空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (!trimmedPart) {
            continue;
        }

        // 整数として解釈できるかチェックし、変換する
        const num = parseInt(trimmedPart, 10);

        // isNaNチェック（整数として解釈できない要素を無視）と、数値の範囲チェック（念のため、問題文では64bitに収まる前提だが安全のため）
        if (!isNaN(num)) {
            // 負の数や非整数なども考慮する必要があるか？ 仕様は「整数列」なので、ここではそのままSetに追加する。
            // 重複を除いた整数のみを扱うため、数値として格納する。
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた要素の個数を求める
    const count = uniqueNumbers.size;

    // 合計を求める
    let sum: bigint = 0n; // BigIntを使用し、64bit以上の合計に対応させる（Node.jsのNumberはIEEE 754の精度に依存するが、ここでは安全のためBigIntを使用）

    for (const num of uniqueNumbers) {
        // 合計を計算。数値はそのまま加算しても良いが、sumが64bitを超えないことが保証されているため、JavaScriptのNumber型で十分である可能性が高い。
        // ただし、厳密な「64bit整数の範囲」を満たすためにBigIntでの集計を行う。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
