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

        // カンマで分割し、空白を無視して整数としてフィルタリング
        const parts = input.trim().split(',');
        
        let numbers: number[] = [];
        for (const part of parts) {
            // 空文字列や空白を除去した後に整数に変換できるか試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるか確認（非数字文字が含まれていないか、数値型に変換可能か）
            const num = Number(trimmedPart);
            if (!isNaN(num) && String(num) === trimmedPart) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を取得
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        let sum: bigint = 0n; // 合計は64bit整数に収まるが、安全のためBigIntで扱う（ただし出力は文字列として扱われる）

        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum.toString()}`);
    });
}

solve();
