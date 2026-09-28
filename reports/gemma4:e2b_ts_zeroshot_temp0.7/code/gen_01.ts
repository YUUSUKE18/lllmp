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

        // カンマで分割し、各要素を数値に変換しようとする
        const parts = input.trim().split(',');
        let uniqueNumbers: Set<number> = new Set();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 空文字列や空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェック
            const num = Number(trimmedPart);

            if (!isNaN(num)) {
                // 整数として有効な場合、重複をチェックし、合計に加算する
                if (!uniqueNumbers.has(num)) {
                    uniqueNumbers.add(num);
                    sum += BigInt(num);
                }
            }
        }

        const count = uniqueNumbers.size;
        // 合計は64bit整数に収まるが、安全のためBigIntで計算した結果を出力する
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
