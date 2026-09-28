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

        // カンマで分割し、各要素を文字列として取得
        const parts = input.trim().split(',');

        let count = 0;
        let sum = 0n; // 64bit整数を扱うため BigInt を使用

        // 重複を除いたユニークな整数をセットに格納
        const uniqueNumbers = new Set<number>();

        for (const part of parts) {
            // 空文字列や空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数としてパースを試みる
            const num = Number(trimmedPart);

            if (!isNaN(num)) {
                // 整数であるかチェック（小数点以下の値や大きな数値の扱いも考慮し、ここでは通常のNumberで十分と仮定）
                uniqueNumbers.add(num);
            }
        }

        // 個数と合計を計算
        count = uniqueNumbers.size;
        sum = 0n;

        for (const num of uniqueNumbers) {
            // 合計を BigInt に加算
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
