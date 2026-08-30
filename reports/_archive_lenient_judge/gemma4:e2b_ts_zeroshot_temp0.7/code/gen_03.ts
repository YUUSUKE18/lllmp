import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';
    data.on('data', (chunk) => {
        data += chunk;
    });

    data.on('end', () => {
        // 入力をカンマで分割し、空白を除去して整数に変換する
        const numbersStr = data.trim();
        if (!numbersStr) {
            console.log("count=0 sum=0");
            return;
        }

        const numberStrings = numbersStr.split(',');
        let uniqueNumbers = new Set<number>();
        let totalSum = 0;

        for (const numStr of numberStrings) {
            const trimmedStr = numStr.trim();
            if (trimmedStr === "") continue;

            // 整数として解釈できるかチェック
            const num = parseInt(trimmedStr, 10);
            if (!isNaN(num)) {
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた数の個数と合計を計算する
        const count = uniqueNumbers.size;
        uniqueNumbers.forEach(num => {
            totalSum += num;
        });

        // 結果を出力する
        console.log(`count=${count} sum=${totalSum}`);
    });
}

solve();
