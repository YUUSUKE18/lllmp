import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let data = '';
    input.on('line', (line) => {
        data += line + '\n';
    });

    input.on('end', () => {
        // 入力をカンマで分割し、各要素を整数に変換しようとする
        const parts = data.trim().split(',');
        
        let numbers: number[] = [];
        for (const part of parts) {
            if (part) {
                const num = parseInt(part.trim(), 10);
                // 整数として解釈でき、かつNaNでないことを確認
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            }
        }

        // 重複を除いた整数を取得
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 64bit整数として扱うためBigIntを使用
        
        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        process.stdout.write(`count=${count} sum=${sum}\n`);
    });
}

solve();
