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
        if (!inputData) return;

        // カンマで分割し、各要素を整数に変換する
        const parts = inputData.trim().split(',');

        let numbers: number[] = [];
        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart) {
                // 整数として解釈可能かチェックし、変換を試みる
                const num = Number(trimmedPart);
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            }
        }

        // 重複を除いた整数を取得する
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する (合計は64bitに収まるため標準のnumber型で十分)
        let count = 0;
        let sum = 0;

        for (const num of uniqueNumbers) {
            count++;
            sum += num;
        }

        // 結果を出力する
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
