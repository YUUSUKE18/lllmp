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

        // カンマで分割し、空文字列や空白をトリムして整数に変換する
        const parts = input.trim().split(',');

        let numbers: number[] = [];
        for (const part of parts) {
            if (part.length > 0) {
                const num = parseInt(part.trim(), 10);
                // 整数として解釈でき、かつNaNでないことを確認する（ここでは文字列が数字のみであることを想定）
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        // 合計は64bit (JavaScriptのNumber型で十分だが、念のためBigIntや安全性を考慮する場合は注意。ここでは標準のNumberで十分)
        let sum: number = 0;
        for (const num of uniqueNumbers) {
            sum += num;
        }

        // 結果を出力する
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
