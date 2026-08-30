import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();

    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック：整数として解釈できるか、64bit範囲内か（ここでは標準の安全性を考慮し、そのまま比較）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            hasValidNumber = true;
        }
    }

    // 念のため、もし入力が空または数値を含まなかった場合も対応（仕様上は整数列のみが期待されるが安全策）
    if (!hasValidNumber) {
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
