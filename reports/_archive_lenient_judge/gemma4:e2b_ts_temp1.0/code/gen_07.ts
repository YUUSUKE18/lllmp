/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let distinctNumbers = new Set<number>();
    let totalSum: bigint = 0n; // 合計は64bit整数（JavaScriptの`number`型では精度が限られるためBigIntを使用）

    for (const part of parts) {
        // 前後の空白を無視して整数としてパースを試みる
        const trimmedPart = part.trim();
        if (!trimmedPart) continue;

        // 整数として解釈できるか確認し、変換する
        const num = Number(trimmedPart);

        if (Number.isInteger(num)) {
            // 数値が有効であればセットに追加
            distinctNumbers.add(num);
        }
    }

    // セット内の重複を除いた要素の合計を計算
    for (const num of distinctNumbers) {
        // 合計をBigIntで加算する（入力値が大きくなる可能性があるため）
        totalSum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${distinctNumbers.size} sum=${totalSum.toString()}`);
}

solve();
