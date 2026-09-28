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
        const tokens = input.trim().split(',');
        
        let numbers: number[] = [];
        let sum: bigint = 0n;
        let count: number = 0;

        for (const token of tokens) {
            // 前後の空白を無視して整数として解釈できるか試みる
            const trimmedToken = token.trim();
            if (trimmedToken === '') continue;

            const num = parseInt(trimmedToken, 10);
            
            // 整数として解釈できた場合のみ採用する
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた要素を処理する
        const uniqueNumbers = Array.from(new Set(numbers));

        let finalSum: bigint = 0n;
        let finalCount: number = 0;

        for (const num of uniqueNumbers) {
            finalSum += BigInt(num);
            finalCount++;
        }

        // 結果を出力
        console.log(`count=${finalCount} sum=${finalSum}`);
    });
}

solve();
