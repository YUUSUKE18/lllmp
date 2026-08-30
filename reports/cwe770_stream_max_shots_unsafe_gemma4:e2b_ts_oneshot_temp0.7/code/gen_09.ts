import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、かつ64bit範囲内（安全のため）のチェック（仕様上は任意だが念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            validNumbersFound = true;
        }
    }

    // 整数として解釈できた要素のみを数える必要があるため、
    // ここで集計された count と maxValue を出力する。

    // もし入力が空または有効な整数が一つもなかった場合、count=0, maxに適切な値を入れる必要がある。
    // 仕様に基づくと、読み込んだカンマ区切りの要素の数を数えるのではなく、「整数として解釈できた要素」の数を数えるのが自然だが、
    // 「要素数」と「最大値」が何を指すか明確でないため、ここでは「整数として解釈された要素の総数」と「その中の最大値」を求める。

    if (!validNumbersFound) {
        // 有効な整数が一つもなかった場合
        process.stdout.write(`count=0 max=-Infinity\n`); // または他の定義（例：max=0など）
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
