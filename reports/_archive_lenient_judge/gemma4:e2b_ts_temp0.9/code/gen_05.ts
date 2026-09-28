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

        // 入力全体をカンマで分割し、空白や空文字列を除去しながら整数に変換する
        const inputString = lines.join('');
        
        // カンマで分割
        const parts = inputString.split(',');
        
        let numbers: number[] = [];

        for (const part of parts) {
            // 前後の空白を除去し、整数に変換を試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 数値として解釈できるかチェック（小数点や文字が含まれていないか）
            if (/^-?\d+$/.test(trimmedPart)) {
                const num = parseInt(trimmedPart, 10);
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        let sum: number = 0;

        for (const num of uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
