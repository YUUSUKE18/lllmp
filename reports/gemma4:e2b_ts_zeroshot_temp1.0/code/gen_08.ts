/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        // 空文字列や空白を除去して整数として解釈できるかチェック
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // parseIntを使って整数に変換を試みる。NaNになる場合は無視する。
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、Setにまだ含まれていないかチェック
        if (!isNaN(num)) {
            // 仕様上、合計は64bitに収まるため、JavaScriptのNumber型（53bit精度）ではなくBigIntを使用する。
            // ただし、入力値自体が通常の数値範囲内であれば、ここでは通常の数値処理で十分だが、
            // 合計を安全にするためBigIntを使う。
            if (!uniqueNumbers.has(num)) {
                uniqueNumbers.add(num);
                sum += BigInt(num);
            }
        }
    }

    const count = uniqueNumbers.size;
    const totalSum = sum; // BigInt型で保持

    // 出力: count=<個数> sum=<合計>
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
