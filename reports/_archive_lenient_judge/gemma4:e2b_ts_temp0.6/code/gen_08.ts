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
    const numbers: number[] = [];

    for (const part of parts) {
        // 空文字列や空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart) {
            const num = parseInt(trimmedPart, 10);
            // 整数として解釈できた場合のみ格納する（NaNでないこと、そして数値として有効な範囲内であることも考慮）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求める
    // Setを使用して重複を排除する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、安全のためBigIntを使用（ただし最終出力は通常の数値として扱う）

    for (const num of uniqueNumbers) {
        count++;
        // 合計を計算。入力の制約から、個数と合計は標準的な数値型で十分である可能性が高いが、念のため64bit対応としてBigIntで集計する。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
