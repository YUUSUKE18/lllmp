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

        // カンマで分割し、空白を除去して数値に変換する
        const parts = input.trim().split(',');

        let count = 0;
        let maxValue = -Infinity;
        let validCount = 0;

        for (const part of parts) {
            // 空文字列や前後の空白を無視
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェックし、64bit範囲内か確認
            const num = parseInt(trimmedPart, 10);

            // isNaN チェックと数値の有効性チェック（浮動小数点数などを含むため）
            if (!isNaN(num) && String(num) === trimmedPart) {
                // 整数として有効な値
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }

        // 求められた要素数と最大値を標準出力に出力
        console.log(`count=${count} max=${maxValue}`);
    });
}

solve();
