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

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n; // 合計は64bit整数になる可能性があるためBigIntを使用（念のため）

        for (const part of parts) {
            // 前後の空白を無視して数値に変換を試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるかチェック
            const num = parseInt(trimmedPart, 10);

            if (!isNaN(num)) {
                // 数値が有効であれば、重複をチェックし、合計に加算する
                uniqueNumbers.add(num);
                sum += BigInt(num);
            }
        }

        const count = uniqueNumbers.size;
        const totalSum = sum;

        // 結果を出力
        process.stdout.write(`count=${count} sum=${totalSum}\n`);
    });
}

solve();
