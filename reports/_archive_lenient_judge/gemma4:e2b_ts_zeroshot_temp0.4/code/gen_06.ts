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

        // カンマで分割し、前後の空白を無視して整数に変換する
        const parts = input.trim().split(',');
        
        let numbers: number[] = [];
        for (const part of parts) {
            // 空文字列や空白のみの要素はスキップ
            if (part.trim() === '') continue;
            
            const num = parseInt(part.trim(), 10);
            
            // 整数として解釈できるかチェック
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算する (合計は64bitに収まる)
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数として扱うためBigIntを使用（念のため）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
