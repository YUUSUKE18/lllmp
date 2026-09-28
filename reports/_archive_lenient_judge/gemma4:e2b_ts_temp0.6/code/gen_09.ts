import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line + '\n';
    });

    rl.on('close', () => {
        if (!input) return;

        // カンマで分割し、空白を無視して整数に変換する
        const numbers = input
            .trim()
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => {
                // 整数として解釈できるか試みる
                const num = Number(s);
                if (isNaN(num)) {
                    return NaN; // 非数値を返す
                }
                return num;
            })
            .filter(n => !isNaN(n)); // NaNを除外

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する (合計は64bitに収まる前提)
        let count = 0;
        let sum = 0n; // 64bit整数として扱うためBigIntを使用（Node.jsのNumber型は53bit精度のため）

        for (const num of uniqueNumbers) {
            count++;
            // 合計をBigIntで計算し、最終的に出力時に文字列に変換する
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
