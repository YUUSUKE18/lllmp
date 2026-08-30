import * as readline from 'readline';

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
        
        // 入力全体をパース
        const parts = input.split(/[\s,]+/).filter(p => p.length > 0);

        let totalCount = 0;
        let totalSum = 0;

        for (const part of parts) {
            const colonIndex = part.indexOf(':');
            if (colonIndex === -1) {
                continue; // 値:回数 の形式でないものは無視
            }

            const valueStr = part.substring(0, colonIndex);
            const countStr = part.substring(colonIndex + 1);

            // 値と回数を整数に変換
            const value = parseInt(valueStr, 10);
            const count = parseInt(countStr, 10);

            // 値が有効で、回数が非負であるかを確認
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                totalCount += count;
                totalSum += value * count;
            }
        }

        // 結果の出力
        console.log(`count=${totalCount} sum=${totalSum}`);
    });
}

solve();
