import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        if (part) {
            // 空白を除去して整数として解釈可能か確認する。parseIntは文字列の先頭から数字を読み取るため、
            // "1, 2, 3" のようなケースで区切り文字の後のスペースなどを考慮する必要があるが、
            // 仕様ではカンマ区切りの整数列とあるため、ここでは単純に整数変換を試みる。
            const num = parseInt(part.trim(), 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を取得する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    const count = uniqueNumbers.length;
    let sum: bigint = 0n; // 合計は64bit整数として扱うためBigIntを使用（必要であれば）

    for (const num of uniqueNumbers) {
        // 合計が64bitに収まるという制約があるため、通常のNumber型で計算しても問題ないはずだが、
        // 安全のためBigIntで集計し、出力時に適切な形式にする。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
