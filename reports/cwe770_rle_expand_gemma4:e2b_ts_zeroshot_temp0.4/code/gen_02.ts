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
            console.log('count=0 sum=0');
            return;
        }

        const inputString = lines[0].trim();
        
        // カンマで分割して、各ペアを処理
        const parts = inputString.split(',');
        
        let totalCount = 0n;
        let totalSum = 0n;

        for (const part of parts) {
            if (!part) continue;

            const [valueStr, countStr] = part.trim().split(':');
            
            if (valueStr && countStr) {
                const value = parseInt(valueStr, 10);
                const count = parseInt(countStr, 10);

                // 値が有効で、回数が非負の場合のみ処理
                if (!isNaN(value) && !isNaN(count) && count >= 0) {
                    // 要素数と合計を64bit整数として計算
                    totalCount += BigInt(count);
                    totalSum += BigInt(value) * BigInt(count);
                }
            }
        }

        // 結果を出力
        console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
    });
}

solve();
