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

        // カンマで分割し、各要素を整数に変換しようとする
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 前後の空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるか試みる
            const num = parseInt(trimmedPart, 10);

            if (!isNaN(num)) {
                // 整数であれば重複を除いてセットに追加し、合計に加算する
                uniqueNumbers.add(num);
                sum += BigInt(num);
            }
        }

        const count = uniqueNumbers.size;
        const totalSum = sum;

        // 結果を出力
        console.log(`count=${count} sum=${totalSum}`);
    });
}

solve();
