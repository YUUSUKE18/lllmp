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

            // 整数として解釈できるかチェックし、変換する
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める (Setを使用)
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数に収まるが、安全のためBigIntで扱う（ただし最終出力は数値として扱う）

        for (const num of uniqueNumbers) {
            // 合計を計算。問題の制約から通常のNumber型でも十分だが、念のためsumもBigIntとして保持する
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
