import * as readline from 'node:readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    rl.on('line', (line) => {
        lines.push(line.trim());
    });

    rl.on('close', () => {
        const input = lines.join('\n');
        const parts = input.split(/\s+/).filter(s => s.length > 0);

        let totalCount = 0;
        let totalSum = 0;

        for (const part of parts) {
            const colonIndex = part.indexOf(':');
            if (colonIndex === -1) {
                continue;
            }

            const valueStr = part.substring(0, colonIndex);
            const countStr = part.substring(colonIndex + 1);

            // 値と回数が存在し、値が数値であり、回数が数値であるかチェック
            if (!isNaN(Number(valueStr)) && !isNaN(Number(countStr))) {
                const value = parseInt(valueStr, 10);
                const count = parseInt(countStr, 10);

                // 回数が0以上であること、値と回数が有効な整数であることを確認
                if (count >= 0) {
                    totalCount += count;
                    totalSum += value * count;
                }
            }
        }

        console.log(`count=${totalCount} sum=${totalSum}`);
    });
}

solve();
