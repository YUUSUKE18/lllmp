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
        if (!input.trim()) {
            console.log('count=0 sum=0');
            return;
        }

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let totalSum = 0n; // BigIntで合計を保持（64bitを超える可能性を考慮し安全性を高める）

        for (const part of parts) {
            // 前後の空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるか試みる
            const num = parseInt(trimmedPart, 10);

            if (!isNaN(num)) {
                // 整数として有効な場合、重複を除いた集合に追加し、合計を計算する
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた要素の個数と合計を計算
        const count = uniqueNumbers.size;
        let sum = 0n;

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
