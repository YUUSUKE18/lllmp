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
        // 入力データを処理
        if (!inputData.trim()) {
            console.log("count=0 sum=0");
            return;
        }

        // カンマで分割し、各要素を整数に変換して重複を除いたセットを作成
        const numbers = inputData
            .trim()
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0) // 空文字列を除外
            .map(s => {
                // 整数として解釈できない要素は無視（NaNになる）
                const num = parseInt(s, 10);
                return isNaN(num) ? NaN : num;
            })
            .filter(num => !isNaN(num)); // NaNを除外

        // 重複を除いた整数のみを抽出
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 64bit以上の合計を保持するためBigIntを使用

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
