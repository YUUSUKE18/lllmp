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
        const lines = input.trim().split('\n').filter(line => line.length > 0);

        if (lines.length === 0) {
            process.stdout.write('count=0 sum=0\n');
            return;
        }

        const data = lines[0].trim();
        if (!data) {
            process.stdout.write('count=0 sum=0\n');
            return;
        }

        const parts = data.split(',');
        let totalCount = 0n;
        let totalSum = 0n;

        for (const part of parts) {
            if (!part) continue;

            const [valueStr, countStr] = part.split(':');
            if (!valueStr || !countStr) continue;

            const value = parseInt(valueStr.trim(), 10);
            const count = parseInt(countStr.trim(), 10);

            // 値が数値であり、回数が0以上であるかを確認
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                const numCount = BigInt(count);
                const numValue = BigInt(value);

                totalCount += numValue * numCount;
                totalSum += numValue * numCount;
            }
        }

        // 結果を出力
        process.stdout.write(`count=${totalCount.toString()} sum=${totalSum.toString()}\n`);
    });
}

solve();
