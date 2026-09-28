import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // 入力をカンマで分割し、各要素を数値に変換する
    const tokens = input.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValid = false;

    for (const token of tokens) {
        const trimmedToken = token.trim();
        if (trimmedToken === '') continue;

        // 数値として解釈できるかチェックし、64bitの範囲内かチェックする
        const num = Number(trimmedToken);
        if (!isNaN(num) && num >= -2**63 && num <= 2**63 - 1) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValid = true;
        }
    }

    // isValidがtrueになった場合のみ出力する（少なくとも一つの有効な整数があった場合）
    if (isValid) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
