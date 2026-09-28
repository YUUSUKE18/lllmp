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

        // カンマで分割し、空白を除去して整数に変換する
        const parts = input.trim().split(',');

        let numbers: number[] = [];
        for (const part of parts) {
            // 空文字列や空白を無視
            if (part.length > 0) {
                const num = parseInt(part.trim(), 10);
                // 整数として解釈できるか確認
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            }
        }

        // 重複を除いた整数を取得
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        // 合計は64bit整数に収まることを前提とする (JavaScriptのNumber型はIEEE 754倍精度で、安全な整数範囲内では問題ない)
        let sum: number = 0;
        for (const num of uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
