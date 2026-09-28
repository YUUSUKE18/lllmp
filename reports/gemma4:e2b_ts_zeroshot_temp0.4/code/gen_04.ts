import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart) {
            const num = parseInt(trimmedPart, 10);
            // 整数として解釈できた場合のみ採用する（NaNでないこと、そして元の文字列が純粋な整数表現であることを確認する必要があるが、ここではparseIntの挙動に依存しつつ、仕様に従い「整数として解釈できない要素も無視」を考慮する）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求めるために Set を使用する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計は64bit整数に収まるため、安全のためBigIntを使用するが、最終出力は通常の数値として扱う（問題文の制約に従う）

    for (const num of uniqueNumbers) {
        count++;
        // 合計を計算。合計が64bitに収まることを保証するため、標準のNumber型で計算を進める。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
