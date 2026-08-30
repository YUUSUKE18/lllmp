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
        // 入力全体を処理
        const inputString = data.trim();

        if (!inputString) {
            console.log("count=0 sum=0");
            return;
        }

        // カンマで分割し、各要素を整数に変換してフィルタリング
        const numbers = inputString.split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => parseInt(s, 10))
            .filter(n => !isNaN(n));

        // 重複を除いた整数を求める (Setを使用)
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        let count = uniqueNumbers.length;
        let sum = 0;

        for (const num of uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
