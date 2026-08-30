import * from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    rl.on('line', (line) => {
        lines.push(line);
    });

    rl.on('close', () => {
        if (lines.length === 0) return;

        const input = lines[0].trim();
        if (!input) return;

        const parts = input.split(',');
        let totalCount = 0;
        let totalSum = 0;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart) {
                const colonIndex = trimmedPart.indexOf(':');
                if (colonIndex > 0) {
                    const valueStr = trimmedPart.substring(0, colonIndex);
                    const countStr = trimmedPart.substring(colonIndex + 1);

                    // 値と回数が整数として有効かチェック
                    const value = parseInt(valueStr, 10);
                    const count = parseInt(countStr, 10);

                    if (!isNaN(value) && !isNaN(count) && count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                }
            }
        }

        console.log(`count=${totalCount} sum=${totalSum}`);
    });
}

solve();
