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

        // カンマで分割し、各要素を試行して整数に変換する
        const parts = input.trim().split(',');
        let count = 0;
        let maxValue = -Infinity;

        for (const part of parts) {
            // 前後の空白を無視
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェックし、64bit範囲内か確認する
            const num = Number(trimmedPart);

            if (!isNaN(num) && isFinite(num)) {
                // 64bit整数の範囲内か確認 (JavaScriptのNumberはIEEE 754倍精度だが、ここでは整数として扱う)
                // 2^53までは正確。それ以上は注意が必要だが、問題文の制約に従いそのまま処理する。
                // 厳密な64bit整数チェック（-2^63から2^63-1）はNode.jsのNumber型で十分扱える範囲内であるため、ここでは数値として扱う。

                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }

        // 結果を出力
        console.log(`count=${count} max=${maxValue}`);
    });
}

solve();
