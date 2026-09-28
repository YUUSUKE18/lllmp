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
            // 前後の空白を除去して整数としてパースを試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるか確認し、変換する
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                // 64bit整数の範囲に収まることを前提とする（JavaScriptのNumberはIEEE 754倍精度だが、ここでは安全のためBigIntで合計を管理）
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた整数について個数と合計を計算する
        const count = uniqueNumbers.size;
        let totalSum = 0n;

        for (const num of uniqueNumbers) {
            totalSum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${totalSum.toString()}`);
    });
}

solve();
