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
        // 入力をカンマで分割し、空白を除去して整数に変換する
        const numbersStr = data.trim();
        if (!numbersStr) {
            console.log("count=0 sum=0");
            return;
        }

        const numberStrings = numbersStr.split(',');
        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const numStr of numberStrings) {
            const trimmedStr = numStr.trim();
            if (trimmedStr === "") continue;

            // 整数として解釈可能かチェックし、変換する
            const num = Number(trimmedStr);
            if (!isNaN(num)) {
                // 合計は64bit範囲に収まることを前提とするが、安全のためBigIntで保持する
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた整数について個数と合計を計算する
        const count = uniqueNumbers.size;
        let totalSum = 0n;

        for (const num of uniqueNumbers) {
            totalSum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${totalSum.toString()}`);
    });
}

solve();
