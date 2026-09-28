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

        // カンマで分割し、各要素を整数に変換しようと試みる
        const parts = input.trim().split(',');
        let numbers: number[] = [];

        for (const part of parts) {
            // 前後の空白を除去して整数としてパースを試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            const num = parseInt(trimmedPart, 10);
            
            // 整数として解釈できた場合のみ追加する
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める (Setを使用)
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数に収まるため、安全のためBigIntで初期化（ただし最終出力は数値として扱う）

        for (const num of uniqueNumbers) {
            // 合計を計算。問題の制約上、通常のJavaScriptのNumber型でも十分だが、念のため大きな数に対応できるようにする。
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
