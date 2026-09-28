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
        let sum: bigint = 0n; // 合計は64bit整数として扱うためBigIntを使用（安全のため）

        for (const part of parts) {
            // 前後の空白を無視し、空文字列でないことを確認
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるか試みる
            const num = parseInt(trimmedPart, 10);

            // isNaNチェックと、元の文字列が数字のみで構成されているかの確認（厳密な整数判定）
            if (!isNaN(num) && String(num) === trimmedPart) {
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた数の個数と合計を計算
        const count = uniqueNumbers.size;
        let totalSum: bigint = 0n;

        for (const num of uniqueNumbers) {
            totalSum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${totalSum.toString()}`);
    });
}

solve();
