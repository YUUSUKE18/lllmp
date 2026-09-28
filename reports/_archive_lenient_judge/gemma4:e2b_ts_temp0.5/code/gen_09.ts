import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line + '\n';
    });

    rl.on('close', () => {
        if (!input) return;

        // カンマで分割し、トリムして空文字列を除去
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 空の要素や数値として解釈できないものを無視
            if (part.trim() === '') continue;

            const num = parseInt(part.trim(), 10);

            // 整数として解釈できるかチェック
            if (!isNaN(num)) {
                // 数値が64bitの範囲内にあることを確認（ここでは一般的なJSのNumber型で十分だが、BigIntに変換して処理する）
                const n = BigInt(num);
                uniqueNumbers.add(n);
                sum += n;
            }
        }

        const count = uniqueNumbers.size;
        // 合計は64bit整数として出力（BigIntを文字列に変換）
        const totalSumString = sum.toString();

        process.stdout.write(`count=${count} sum=${totalSumString}\n`);
    });
}

solve();
