import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let lines = input.getLines();
    if (lines.length === 0) {
        return;
    }

    // 全ての入力行を結合し、カンマで分割して処理する
    const fullInput = lines.join('\n');
    const tokens = fullInput.split(/[\s,]+/).filter(token => token.length > 0);

    const numbers = [];
    for (const token of tokens) {
        // 数値として解釈できるかチェックし、整数に変換する
        const num = Number(token);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数のみを抽出
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum = 0n; // 64bit整数を考慮するためBigIntを使用（JavaScriptのNumber型は安全だが、明示的に大きな数に対応させるため）

    for (const num of uniqueNumbers) {
        // 合計が64bitに収まることを前提とする。Node.jsの標準のNumberはIEEE 754倍精度であり、
        // 安全な整数範囲は約2^53までだが、問題文で64bit(2^64-1)とあるため、BigIntを使うのが最も安全。
        // ただし、入力が通常の安全な数値範囲内であればNumberでも十分かもしれないが、厳密性を優先する。
        sum += BigInt(num);
        count++;
    }

    // 結果の出力
    process.stdout.write(`count=${count} sum=${sum.toString()}\n`);
}

solve();
