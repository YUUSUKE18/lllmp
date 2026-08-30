import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、文字列が数字のみで構成されているかの確認（厳密な整数判定のため）
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 整数として有効な場合
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた数の合計を計算する
    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${uniqueNumbers.size} sum=${sum.toString()}`);
}

solve();
