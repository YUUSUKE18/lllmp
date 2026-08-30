import * as process from "process";

function solve() {
    const input = process.stdin.fd;
    const data = process.stdin.readSync();
    if (!data) return;

    const inputString = data.toString().trim();
    if (inputString === "") {
        process.stdout.write("count=0 max=-Infinity\n");
        return;
    }

    const parts = inputString.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 空の入力や数値が存在しない場合のデフォルト処理（仕様上は整数列が与えられる前提だが、念のため）
    if (count === 0) {
        process.stdout.write("count=0 max=-Infinity\n");
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
