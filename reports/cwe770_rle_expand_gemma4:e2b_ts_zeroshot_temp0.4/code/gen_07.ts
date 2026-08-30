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
        
        let totalCount = 0n; // 64bit整数を想定
        let totalSum = 0n;    // 64bit整数を想定

        for (const part of parts) {
            if (!part) continue;

            const [valueStr, countStr] = part.split(':');
            
            if (valueStr && countStr) {
                const value = parseInt(valueStr.trim(), 10);
                const count = parseInt(countStr.trim(), 10);

                // 値が数値であり、回数が非負であるか確認
                if (!isNaN(value) && !isNaN(count) && count >= 0) {
                    // 要素数と合計を計算
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
