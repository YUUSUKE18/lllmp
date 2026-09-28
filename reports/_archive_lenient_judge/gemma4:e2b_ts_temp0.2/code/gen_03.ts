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
        let numbers: number[] = [];

        for (const part of parts) {
            // 前後の空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェックし、変換する
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する (合計は64bit範囲に収まる前提)
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計が大きくなる可能性があるためBigIntを使用（念のため）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
