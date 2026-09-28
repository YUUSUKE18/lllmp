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
        let count = 0;
        let maxValue = -Infinity;
        let validCount = 0;

        for (const part of parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // parseIntで整数に変換を試みる。NaNになる場合は無視する。
            const num = Number(trimmedPart);

            // 整数であり、64bitの範囲内（JavaScriptのNumber型はIEEE 754倍精度で十分だが、ここでは明示的にチェック）
            if (Number.isInteger(num) && num >= -2**53 && num <= 2**53) {
                validCount++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }

        // 要素数と最大値を計算し、結果を出力する
        console.log(`count=${validCount} max=${maxValue}`);
    });
}

solve();
