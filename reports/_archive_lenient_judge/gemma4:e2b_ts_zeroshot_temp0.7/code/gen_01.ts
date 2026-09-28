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

        // カンマで分割し、各要素を数値に変換しようと試みる
        const parts = input.trim().split(',');
        let numbers: number[] = [];

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェックし、変換を試みる
            const num = Number(trimmedPart);
            if (!isNaN(num) && Number.isInteger(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を取得
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        // 合計は64bit整数（JavaScriptのNumber型で十分）に収まる
        const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
