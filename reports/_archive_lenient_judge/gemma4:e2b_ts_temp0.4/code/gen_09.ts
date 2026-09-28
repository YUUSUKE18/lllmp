import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => {
            const num = parseInt(s, 10);
            // 整数として解釈できない要素を無視する（NaNになる場合）
            if (!isNaN(num)) {
                return num;
            }
            return NaN;
        })
        .filter(n => !isNaN(n));

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、BigIntを使用（念のため）

    for (const num of uniqueNumbers) {
        count++;
        // 合計は64bit整数に収まるため、通常のNumberでも問題ないが、安全のためBigIntで計算する
        sum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
