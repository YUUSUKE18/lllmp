import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        // 前後の空白を無視
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bitの範囲内か確認する（ここではJSのNumber型で十分）
        if (!isNaN(num)) {
            // 64bitの範囲内であるという制約は、一般的なJavaScriptのNumber型が扱う範囲内で満たされるため、
            // parseIntの結果をそのまま使用します。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            validNumbersFound = true;
        }
    }

    // 整数として解釈できた要素が一つでも存在した場合のみ出力する（空入力の場合の考慮）
    if (validNumbersFound) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
