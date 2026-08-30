import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマ区切りの文字列を読み込む
    const inputString = input.trim();
    if (inputString === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = inputString.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか確認し、64bit範囲内であるか（ここでは標準のNumber型で十分だが、念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
