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
        try {
            // 入力全体を読み込み、改行で分割して整数列を取得
            const inputLines = inputData.trim().split(/\s*,\s*|\n/).filter(s => s.length > 0);

            if (inputLines.length === 0) {
                console.log("count=0 sum=0");
                return;
            }

            // カンマ区切りの文字列を個々の数値に変換
            const numbers = inputLines.map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

            // 重複を除いた整数を取得
            const uniqueNumbers = Array.from(new Set(numbers));

            // 個数と合計を計算
            let count = 0;
            let sum: number = 0;

            for (const num of uniqueNumbers) {
                count++;
                sum += num;
            }

            // 結果を出力
            console.log(`count=${count} sum=${sum}`);

        } catch (e) {
            // エラーが発生した場合は無視するか、必要に応じて処理する（この仕様ではシンプルに終了）
            // console.error(e); 
        }
    });
}

solve();
