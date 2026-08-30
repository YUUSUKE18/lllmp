import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // 入力をカンマで分割し、空白を除去して整数に変換する
    const parts = input.trim().split(',');

    const numbers: number[] = [];
    for (const part of parts) {
        // 空文字や空白を除去
        if (part.length > 0) {
            const num = parseInt(part.trim(), 10);
            // 整数として解釈できるか確認し、有効な数値であれば追加
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum = 0n; // 64bit整数を扱うためBigIntを使用 (JavaScriptの標準数値型は安全ではないため)

    for (const num of uniqueNumbers) {
        count++;
        // 合計は64bitに収まるが、念のためBigIntで計算し続ける
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
