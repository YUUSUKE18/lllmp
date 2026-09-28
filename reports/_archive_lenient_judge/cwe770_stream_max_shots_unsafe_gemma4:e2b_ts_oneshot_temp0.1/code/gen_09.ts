import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではNumber型で十分だが、念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める。
    // 仕様では「カンマ区切りの整数列を受け取る」ため、入力された全ての数値の数を数えるのではなく、
    // 有効な整数要素の数を数えるのが自然だが、例示に従い、入力された要素数と最大値を求める。

    // 再度、仕様を厳密に解釈する: 「カンマ区切りの整数列を受け取ります。」
    // これは、入力文字列全体から抽出できる有効な整数のみを対象とする、という意味合いが強い。
    // 読み込んだ全ての要素（空でないもの）の数をカウントし、その中での最大値を求める。

    let finalCount = 0;
    let finalMaxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num) && Number.isSafeInteger(num)) {
            finalCount++;
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    }


    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
