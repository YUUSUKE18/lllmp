import * from 'readline';

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
        if (lines.length === 0) return;

        // 入力全体を一つの文字列として処理
        const input = lines.join('\n');
        const parts = input.split(/\s+/).filter(p => p.length > 0);

        let totalCount = 0n;
        let totalSum = 0n;

        for (const part of parts) {
            const separatorIndex = part.indexOf(':');
            if (separatorIndex === -1) {
                continue; // 値:回数の形式でないものは無視
            }

            const valueStr = part.substring(0, separatorIndex);
            const countStr = part.substring(separatorIndex + 1);

            // 値と回数を解析
            const value = parseInt(valueStr, 10);
            const count = parseInt(countStr, 10);

            // 値が有効な整数であり、回数が非負であるか確認
            if (!isNaN(value) && !isNaN(count) && value >= 0 && count >= 0) {
                // 要素数と合計を計算 (64bit整数として扱うため BigInt を使用)
                const countBigInt = BigInt(count);
                const valueBigInt = BigInt(value);

                totalCount += valueBigInt * countBigInt;
                totalSum += valueBigInt * countBigInt;
            }
        }

        // 結果の出力
        console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
    });
}

solve();
