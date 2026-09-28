import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';

    // 標準入力全体を読み込む
    data = await new Promise<string>((resolve) => {
        process.stdin.on('data', (chunk) => {
            data += chunk;
        });
        process.stdin.on('end', () => {
            resolve(data);
        });
    });

    // 入力をカンマで分割し、整数に変換する
    const parts = data.trim().split(',');

    let numbers: number[] = [];

    for (const part of parts) {
        if (part) {
            const num = parseInt(part.trim(), 10);
            // 整数として解釈でき、かつ無効な値（NaN）でないかチェック
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する (合計は64bitに収まるため、標準のnumber型で十分)
    let count = 0;
    let sum: number = 0;

    for (const num of uniqueNumbers) {
        count++;
        sum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
