/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた要素の個数と合計を計算して出力するプログラム。
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

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n; // 合計は64bit整数の範囲に収まるためBigIntを使用
    let count = 0;

    for (const part of parts) {
        // 前後の空白を除去して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数に変換を試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ重複していないかチェックする
        if (!isNaN(num)) {
            // 数値が安全な範囲内にあることを確認（念のため）
            if (Number.isInteger(num)) {
                if (!uniqueNumbers.has(num)) {
                    uniqueNumbers.add(num);
                    sum += BigInt(num);
                    count++;
                }
            }
        }
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
