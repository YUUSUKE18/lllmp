import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムして配列にする
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を無視（split(',')で区切られた要素自体に空白が含まれる可能性を考慮）
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値比較で対応）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める。
    // 仕様に基づき、カンマ区切りのリストから有効な整数のみを数え、その最大値を求める。
    // ただし、元の入力の「要素数」が何を指すか（全要素数か、有効な数値の数か）が曖昧だが、
    // 例示された出力形式 `count=<個数> max=<最大値>` に基づき、「有効な整数」の数を個数とし、その最大値を求めるものと解釈する。

    let finalCount = 0;
    let finalMaxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            finalCount++;
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    }


    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
