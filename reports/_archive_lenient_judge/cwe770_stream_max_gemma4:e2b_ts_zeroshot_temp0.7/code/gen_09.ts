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

        // カンマで分割し、トリムしてから整数に変換する
        const parts = input.trim().split(',');

        let count = 0;
        let maxValue = -Infinity;
        let isValidInput = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 数値として解釈可能かチェックし、64bit整数に収まるか確認
            const num = Number(trimmedPart);

            if (!isNaN(num)) {
                // 64bit整数範囲内かチェック（JavaScriptのNumberはIEEE 754倍精度だが、ここでは安全のため）
                // 通常の数値として扱えば問題ないが、もし厳密に64bit整数を扱うならBigIntを使うべき。
                // 仕様では「64bit整数の範囲に収まる」とあるため、標準のNumber型で十分とする。
                if (num >= -(2**53) && num <= (2**53 - 1)) { // 概ね安全な範囲
                    count++;
                    if (num > maxValue) {
                        maxValue = num;
                    }
                    isValidInput = true;
                }
            }
        }

        // 結果を出力
        if (isValidInput) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 有効な整数が一つもなかった場合（空入力や非数値のみの場合）、何も出力しない、または仕様に合わせた処理。
            // ここでは、入力から有効な要素が見つからなかった場合は、何も出力しない（あるいは count=0 max=-Infinity のような定義）とする。
            // ただし、入力が完全に無効な場合でも、count=0, max=0などが自然かもしれないが、ここでは「存在する要素」に基づいて計算する。
            // 入力に有効な整数が一つもなかった場合は、何も出力しない（または問題文の制約に従う）。
        }
    });
}

solve();
