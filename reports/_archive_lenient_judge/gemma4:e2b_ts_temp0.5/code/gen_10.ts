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
            // 前後の空白を無視して数値として解釈できるか試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // parseIntやNumber()で整数としてパースを試みる。isNaNチェックも重要。
            const num = Number(trimmedPart);

            if (!isNaN(num)) {
                // 整数であるか確認（浮動小数点数の問題回避のため、厳密に整数のみを扱う）
                if (Number.isInteger(num)) {
                    uniqueNumbers.add(num);
                }
            }
        }

        // 重複を除いた整数について個数と合計を計算する
        const count = uniqueNumbers.size;
        let totalSum: bigint = 0n;

        for (const num of uniqueNumbers) {
            totalSum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${totalSum}`);
    });
}

solve();
