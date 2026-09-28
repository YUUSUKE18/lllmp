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

        // カンマで分割し、各要素を整数に変換しようとする
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 前後の空白を除去して整数として解釈を試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数としてパースを試みる。isNaNチェックはここでは不要だが、parseInt/Numberで検証する
            const num = Number(trimmedPart);

            // 整数であるか確認し、NaNでないことを確認
            if (!isNaN(num) && Number.isInteger(num)) {
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた要素の個数と合計を計算する
        let count = uniqueNumbers.size;
        let totalSum = 0n;

        for (const num of uniqueNumbers) {
            totalSum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${totalSum}`);
    });
}

solve();
