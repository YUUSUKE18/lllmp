import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、空白を無視して整数に変換する
    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => {
            const num = parseInt(s, 10);
            // 数値として解釈できない要素は無視する (NaNになる場合)
            return isNaN(num) ? NaN : num;
        })
        .filter(num => !isNaN(num));

    // 重複を除いた整数を抽出する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum = 0n; // 合計が64bitに収まることを考慮し、BigIntを使用（Node.jsのNumber型は53bit精度のため）

    for (const num of uniqueNumbers) {
        // 合計を計算する際は、安全のためにBigIntとして扱うのが望ましいが、
        // 仕様上「合計は64bit整数の範囲に収まる」ため、標準のNumber（64bit浮動小数点数または53bit整数）で十分かもしれない。
        // ただし、厳密な64bit整数を扱うため、ここでは安全のためBigIntを使用する。
        const numBigInt = BigInt(num);
        sum += numBigInt;
        count++;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
