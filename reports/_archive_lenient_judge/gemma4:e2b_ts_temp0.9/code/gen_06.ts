import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';
    input.on('line', (line) => {
        data += line + '\n';
    });

    input.on('end', () => {
        if (!data.trim()) {
            console.log("count=0 sum=0");
            return;
        }

        // カンマで分割し、空白を除去して整数に変換する
        const numbers = data
            .trim()
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => {
                const num = parseInt(s, 10);
                // 整数として解釈できない要素は無視する (NaNになる場合など)
                if (!isNaN(num)) {
                    return num;
                }
                return NaN;
            })
            .filter(n => !isNaN(n));

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        let count = 0;
        let sum = 0;

        for (const num of uniqueNumbers) {
            count++;
            sum += num;
        }

        // 結果を出力する
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
