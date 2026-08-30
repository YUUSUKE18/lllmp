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

        // カンマで分割し、前後の空白を無視して整数に変換
        const parts = input.trim().split(',');
        const numbers: number[] = [];

        for (const part of parts) {
            // 空文字列や空白のみの要素はスキップ
            if (part.length > 0) {
                const num = parseInt(part.trim(), 10);
                // 整数として解釈できるかチェック
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            }
        }

        // 重複を除いた整数を取得
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算 (合計は64bit範囲に収まることを前提とする)
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計を安全のためBigIntで初期化（64bitを超えないが、念のため）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
