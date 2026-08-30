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

        // カンマで分割し、前後の空白を無視して整数に変換する
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 空文字列や空白のみの要素はスキップ
            if (part.trim() === '') continue;

            // 整数として解釈を試みる
            const num = parseInt(part.trim(), 10);

            // 整数として有効で、かつ重複していないかチェック
            if (!isNaN(num)) {
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた整数の個数と合計を計算する
        const count = uniqueNumbers.size;
        let totalSum = 0n;

        for (const num of uniqueNumbers) {
            totalSum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${totalSum.toString()}`);
    });
}

solve();
