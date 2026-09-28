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
            // 前後の空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェックし、変換
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型（IEEE 754倍精度浮動小数点数）で十分扱えますが、
                // 合計を厳密に64bit整数として扱うため、ここではBigIntを使用します。
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた要素の個数と合計を計算
        let count = 0;
        for (const num of uniqueNumbers) {
            sum += BigInt(num);
            count++;
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
