import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';

    // 標準入力全体を読み込む
    process.stdin.on('data', (chunk) => {
        data += chunk;
    });

    // データがすべて読み込まれたら処理する
    process.stdin.on('end', () => {
        const lines = data.trim().split('\n').filter(line => line.length > 0);
        
        let totalCount = 0;
        let totalSum = 0;

        for (const line of lines) {
            // カンマで分割して個々のペアを取得
            const parts = line.split(',');
            
            for (const part of parts) {
                if (part.includes(':')) {
                    const [valueStr, countStr] = part.split(':');
                    const value = parseInt(valueStr.trim());
                    const count = parseInt(countStr.trim());

                    // 値と回数が有効な整数であり、回数が0以上であることを確認
                    if (!isNaN(value) && !isNaN(count) && count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                }
            }
        }

        // 結果を出力
        console.log(`count=${totalCount} sum=${totalSum}`);
    });
}

solve();
