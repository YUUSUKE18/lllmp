import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェック
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 空の入力があった場合の処理（数値が一つもなかった場合）
    if (count === 0) {
         process.stdout.write("count=0 max=-Infinity\n");
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
