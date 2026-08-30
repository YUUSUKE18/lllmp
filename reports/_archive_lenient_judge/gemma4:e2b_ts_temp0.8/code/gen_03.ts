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
        if (lines.length === 0) {
            console.log("count=0 sum=0");
            return;
        }

        // 全ての入力を一つの文字列として結合し、カンマで分割
        const inputString = lines.join('\n');
        
        // カンマ区切りの整数列を抽出する（改行も考慮して）
        const rawInput = inputString.split(',');

        let numbers: number[] = [];

        for (const item of rawInput) {
            // 前後の空白を除去
            const trimmedItem = item.trim();
            if (trimmedItem === '') continue;

            // 整数として解釈可能かチェックし、変換
            const num = Number(trimmedItem);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を求める
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、安全のためにBigIntを使用（ただし問題の制約上は通常のNumberでも十分だが、念のため）

        for (const num of uniqueNumbers) {
            // 64bit整数に収まる範囲内であるため、標準のNumberとして合計を計算しても問題ないが、
            // 出力形式に合わせてBigIntで保持してから出力する。
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
