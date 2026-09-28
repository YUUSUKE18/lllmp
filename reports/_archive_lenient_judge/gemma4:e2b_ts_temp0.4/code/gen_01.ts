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
            // 前後の空白を無視して整数として解釈できるか試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数としてパースを試みる。isNaN(Number()) や parseInt() の挙動を考慮する。
            const num = Number(trimmedPart);
            if (!isNaN(num) && Number.isInteger(num)) {
                numbers.push(num);
            }
        }

        // 重複を除いた整数を取得
        const uniqueNumbers = Array.from(new Set(numbers));

        // 個数と合計を計算
        const count = uniqueNumbers.length;
        // 合計は64bit整数に収まるため、標準のNumber型（IEEE 754倍精度浮動小数点数）で十分だが、
        // 明示的にBigIntや安全性を考慮する場合は注意が必要。ここでは問題の制約に従い通常の数値計算を行う。
        let sum: number = 0;
        for (const num of uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        console.log(`count=${count} sum=${sum}`);
    });
}

solve();
