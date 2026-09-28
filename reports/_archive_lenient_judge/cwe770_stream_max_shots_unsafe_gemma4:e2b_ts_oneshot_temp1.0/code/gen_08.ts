import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてから整数に変換する
    const parts = input.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか確認し、64bit範囲内か確認（今回はNumber型で十分だが厳密性を保つ）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
