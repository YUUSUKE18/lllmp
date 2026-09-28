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

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = input.trim().split(',');
        let numbers: number[] = [];

        for (const part of parts) {
            // 前後の空白を除去
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるか試みる
            const num = parseInt(trimmedPart, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        // 合計は64bit整数に収まるため、標準のNumber型で十分だが、念のためBigIntや安全性を考慮して累積する
        let sum: number = 0;
        for (const num of uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
