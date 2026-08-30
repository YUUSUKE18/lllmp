import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let inputData = '';

    rl.on('line', (line) => {
        inputData += line + '\n';
    });

    rl.on('close', () => {
        if (!inputData.trim()) {
            console.log('count=0 sum=0');
            return;
        }

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = inputData.trim().split(',');
        let numbers: number[] = [];

        for (const part of parts) {
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

        // 個数と合計を計算する (合計は64bitに収まる前提)
        const count = uniqueNumbers.length;
        const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
