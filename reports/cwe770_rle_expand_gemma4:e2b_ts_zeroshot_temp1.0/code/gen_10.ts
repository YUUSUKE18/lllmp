import * from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line;
    });

    rl.on('close', () => {
        const parts = input.trim().split(/\s+/);

        if (parts.length === 0) {
            console.log('count=0 sum=0');
            return;
        }

        let totalCount = 0;
        let totalSum = 0;

        // カンマ区切りの文字列を処理
        const dataString = parts[0];
        if (!dataString) {
            console.log('count=0 sum=0');
            return;
        }

        const items = dataString.split(',');

        for (const item of items) {
            const trimmedItem = item.trim();
            if (trimmedItem) {
                const partsMatch = trimmedItem.match(/(\d+):(\d+)/);
                if (partsMatch) {
                    const value = parseInt(partsMatch[1], 10);
                    const count = parseInt(partsMatch[2], 10);

                    // 値:回数 の形式で解釈
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
