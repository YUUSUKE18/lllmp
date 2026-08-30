import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    rl.on('line', (line) => {
        lines.push(line);
    });

    rl.on('close', () => {
        if (lines.length === 0) return;

        // 入力をカンマで分割し、空要素や非整数をフィルタリングする
        const inputString = lines[0];
        
        // カンマで分割し、各要素を数値に変換しようと試みる
        const numbers = inputString.split(',')
            .map(s => s.trim()) // 前後の空白を除去
            .filter(s => s.length > 0) // 空文字列を除去
            .map(s => {
                // 整数として解釈できるか試す。'NaN'になるものは無視する。
                const num = Number(s);
                return isFinite(num) ? num : NaN;
            })
            .filter(num => !isNaN(num)); // 数値に変換できなかったものを除外

        // 重複を除いた整数を求めるために Set を使用する
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        let count = 0;
        let sum: bigint = 0n; // 合計は64bit整数に収まるため、安全のためBigIntを使用（ただし標準のNumberでも十分な場合が多いが、仕様に従う）

        for (const num of uniqueNumbers) {
            count++;
            // 合計を計算。入力が非常に大きい可能性があるため、念のためBigIntで加算する
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
