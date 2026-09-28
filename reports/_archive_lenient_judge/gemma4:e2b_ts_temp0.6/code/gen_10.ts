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

        // 入力された行をカンマで分割し、整数に変換する
        const inputString = lines[0];
        const parts = inputString.split(',');

        let numbers: number[] = [];
        for (const part of parts) {
            // 前後の空白を除去して整数として解釈可能かチェック
            const trimmedPart = part.trim();
            if (trimmedPart.length > 0 && /^-?\d+$/.test(trimmedPart)) {
                const num = parseInt(trimmedPart, 10);
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める（Setを使用）
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数に収まるが、念のためBigIntで初期化（ただし最終出力は数値として扱う）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
