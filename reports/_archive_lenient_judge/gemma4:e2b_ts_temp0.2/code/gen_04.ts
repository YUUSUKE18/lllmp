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
            // 前後の空白を無視して整数として解釈できるか試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数としてパースを試みる
            const num = parseInt(trimmedPart, 10);

            // 数値として有効であり、かつ重複がないかチェックする
            if (!isNaN(num)) {
                // 問題の制約から64bitに収まることを前提とするが、Setに入れる際はnumber型で十分。
                // 合計はbigintで保持する。
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた整数について個数と合計を計算する
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
