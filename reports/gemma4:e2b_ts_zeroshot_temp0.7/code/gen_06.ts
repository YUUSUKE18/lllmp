import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈を試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、重複していないかチェックする
        if (!isNaN(num)) {
            // 問題文の制約から、整数として解釈できない要素は無視する必要があるが、
            // ここでは単純に数字として扱えるもののみを処理する。
            // 負の数や浮動小数点数は考慮しない（整数列であるため）
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の合計を計算する
    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${uniqueNumbers.size} sum=${sum.toString()}`);
}

solve();
