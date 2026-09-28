import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // 入力をカンマで分割し、各要素を数値に変換しようと試みる
    const parts = input.trim().split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を除去して整数としてパースを試みる
        const trimmedPart = part.trim();
        if (trimmedPart) {
            const num = Number(trimmedPart);
            // 数値であり、かつ有効な整数であるかを確認する（NaNでないこと、そして整数であること）
            if (!isNaN(num) && Number.isInteger(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    const count = uniqueNumbers.length;
    // BigIntを使用して合計が64bitに収まることを保証しつつ、念のため標準のnumber型（float64）でも十分な範囲内で計算する。
    // 課題文の制約に基づき、結果は通常Number型で十分と仮定する。
    let sum: number = 0;

    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
