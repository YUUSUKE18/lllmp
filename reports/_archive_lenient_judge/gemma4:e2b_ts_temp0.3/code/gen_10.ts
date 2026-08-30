import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';
    input.on('data', (chunk) => {
        data += chunk;
    });

    input.on('end', () => {
        // 入力をカンマで分割し、各要素を整数に変換する
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

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数に収まるため、安全のためBigIntを使用（ただし最終出力は数値として扱う）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
