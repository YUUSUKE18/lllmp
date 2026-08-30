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
        // 入力された文字列を処理する
        const rawData = input.trim();

        if (!rawData) {
            console.log('count=0 sum=0');
            return;
        }

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = rawData.split(',');
        let numbers: number[] = [];

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart) {
                // 整数として解釈可能かチェック
                const num = parseInt(trimmedPart, 10);
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
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
