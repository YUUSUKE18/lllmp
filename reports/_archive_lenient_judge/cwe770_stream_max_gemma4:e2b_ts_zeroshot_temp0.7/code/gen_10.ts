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

        // カンマで分割し、各要素を処理する
        const parts = input.trim().split(',');

        let count = 0;
        let maxValue = -Infinity;
        let validNumbersFound = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるかチェック
            const num = parseInt(trimmedPart, 10);

            // 整数であり、かつ64bitの範囲内（JavaScriptのNumber型はIEEE 754倍精度で安全だが、ここでは明示的にチェック）
            if (!isNaN(num) && Number.isSafeInteger(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                validNumbersFound = true;
            }
        }

        // 処理された要素が一つでもあった場合のみ出力する（仕様上、入力が空の場合も考慮する必要があるが、ここでは「存在する整数列」を想定）
        if (validNumbersFound) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 入力が空または数値を含まなかった場合（このケースの具体的な出力要件は明記されていないが、通常は何も出力しないか、0 0 のような意味を出すべきだが、ここでは入力がないと見なす）
            // 仕様に基づき、有効な要素が見つからなければ何も出力しない、という解釈で進める。
        }
    });
}

solve();
