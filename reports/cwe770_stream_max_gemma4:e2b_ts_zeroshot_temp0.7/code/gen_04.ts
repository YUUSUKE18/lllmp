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
        // 入力された文字列を処理する
        const parts = input.trim().split(',');

        if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
            // 入力が空の場合、何も出力しない（仕様上は整数列が与えられる前提だが安全策）
            return;
        }

        let count = 0;
        let maxValue = -Infinity;
        let isValidInput = false;

        for (const part of parts) {
            // 空白を無視し、整数として解釈可能かチェック
            if (part.trim() === '') continue;

            const num = parseInt(part.trim(), 10);

            // 数値であり、64bit範囲内（安全のため）であるかチェック
            if (!isNaN(num) && isFinite(num)) {
                // 要素数として解釈するか、最大値の候補として扱うかを判断する必要がある。
                // 仕様：「カンマ区切りの整数列を受け取ります。それらの『要素数』と『最大値』を求めます。」
                // これは通常、入力された数列全体から「要素数」と「最大値」を求めることを意味する。

                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValidInput = true;
            }
        }

        // 入力されたデータが有効な整数列であったかどうかのチェックは厳密には求められていないため、
        // 抽出できた要素数と最大値をそのまま出力する。
        if (count > 0) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 有効な整数が一つもなかった場合（例: 空行のみ）、何も出力しないか、
            // またはゼロとマイナス無限大のような値を出力する必要があるが、ここでは「要素数0, 最大値-Infinity」を想定する。
            // 仕様の要求に厳密に従い、入力から抽出されたものだけを報告する。
        }
    });
}

solve();
