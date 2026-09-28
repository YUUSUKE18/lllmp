import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマ区切りの整数列を処理するのではなく、入力全体がカンマ区切りで与えられていると解釈し、
        // 各要素を個別に処理します。ただし、例の形式に合わせるため、ここでは入力全体をトークン化して処理します。

        const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);

        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (!isNaN(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 入力がカンマ区切りの整数列全体として与えられていると仮定し、
    // 最初の例の形式に合わせるため、入力全体を一つのストリームとして処理します。
    // 標準入力から読み込んだ文字列を再処理する必要がありますが、仕様に従い、
    // カンマ区切りの整数列を読み込むことに焦点を当てます。

    // 再度、標準入力全体をカンマで分割して処理する方が自然です。
    const allTokens = input.split(/[\s,]+/).filter(token => token.length > 0);

    let finalCount = 0;
    let finalMaxValue = -Infinity;

    for (const token of allTokens) {
        const num = parseInt(token, 10);
        if (!isNaN(num)) {
            finalCount++;
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    }

    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
