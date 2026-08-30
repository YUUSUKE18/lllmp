import * as readline from 'readline';

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

        const inputLine = lines[0] ? lines[0].trim() : '';
        if (!inputLine) {
            console.log("count=0 sum=0");
            return;
        }

        // カンマで分割し、空白を除去して整数に変換する
        const numbers = inputLine.split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0) // 空文字列を除外
            .map(s => {
                // 整数として解釈できない要素を無視するため、parseIntの結果がNaNでないことを確認する
                const num = parseInt(s, 10);
                return isNaN(num) ? NaN : num;
            })
            .filter(num => !isNaN(num)); // NaNを除外

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する (合計は64bitに収まる)
        let count = 0;
        let sum: bigint = 0n; // 合計が大きくなる可能性があるためBigIntを使用（64bit保証のため）

        for (const num of uniqueNumbers) {
            count++;
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
