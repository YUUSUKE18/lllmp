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

        // 入力された行をカンマで分割し、各要素を整数に変換する
        const inputData = lines[0].trim().split(',');

        let count = 0;
        let maxValue = -Infinity;

        for (const item of inputData) {
            if (item === '') continue; // 空の要素は無視

            const num = parseInt(item.trim(), 10);

            // 整数として解釈できるかチェック
            if (!isNaN(num)) {
                // 値が64bit整数の範囲内か確認（JavaScriptのNumber型はIEEE 754倍精度であり、安全に扱うため）
                // 题目の仕様に従い、単純に数値として処理する。
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }

        // 結果を出力
        console.log(`count=${count} max=${maxValue}`);
    });
}

solve();
