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
        let sum: bigint = 0n;

        for (const part of parts) {
            // 前後の空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェックし、変換を試みる
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                // 整数であるか確認（浮動小数点数でないことを保証するため）
                if (Number.isInteger(num)) {
                    uniqueNumbers.add(num);
                }
            }
        }

        // 重複を除いた数の個数を計算
        const count = uniqueNumbers.size;

        // 合計を計算
        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
