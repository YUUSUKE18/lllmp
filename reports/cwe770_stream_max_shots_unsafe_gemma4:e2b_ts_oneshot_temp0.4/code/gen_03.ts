import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムして整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJSのNumber型で十分だが、念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 厳密に count=<個数> max=<最大値> を出力する
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
