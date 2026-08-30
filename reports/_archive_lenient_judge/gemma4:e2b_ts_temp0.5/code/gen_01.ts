import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0) // 空文字列を除外
        .map(s => {
            // 整数として解釈できない要素は無視される（parseIntがNaNを返すため）
            const num = parseInt(s, 10);
            return isNaN(num) ? NaN : num;
        })
        .filter(n => !isNaN(n)); // NaNを除外

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、安全のためBigIntを使用（ただし最終出力は数値形式）

    for (const num of uniqueNumbers) {
        // 仕様上、整数として解釈されたもののみを対象とする
        if (Number.isInteger(num)) {
            count++;
            sum += BigInt(num);
        }
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
