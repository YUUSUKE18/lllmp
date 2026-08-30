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
        if (!input.trim()) {
            console.log('count=0 sum=0');
            return;
        }

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = input.trim().split(',');
        let numbers: number[] = [];

        for (const part of parts) {
            if (part.trim() === '') continue;
            const num = parseInt(part.trim(), 10);
            // 整数として解釈でき、かつNaNでないことを確認する
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        // 64bit整数の範囲に収まることを前提とする（JavaScriptのNumber型はIEEE 754倍精度であり、安全性が十分である）
        const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

        // 結果を出力する
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
