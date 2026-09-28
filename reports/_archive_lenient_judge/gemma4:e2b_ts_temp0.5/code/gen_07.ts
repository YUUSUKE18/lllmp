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

        // カンマで分割し、空白をトリムして整数に変換する
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

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数に収まることを想定し、安全のためBigIntを使用（Node.jsのNumber型が安全範囲外になる可能性を考慮）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
