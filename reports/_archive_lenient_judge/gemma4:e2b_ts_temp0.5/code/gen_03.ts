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

        // カンマで分割し、空白を除去して整数に変換する
        const parts = input.trim().split(',');
        let numbers: number[] = [];

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるかチェック
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する (合計は64bitに収まるという前提)
        let count = 0;
        let sum: bigint = 0n; // 合計を安全のためにBigIntで保持（仕様上は64bit整数だが、念のため）

        for (const num of uniqueNumbers) {
            count++;
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
