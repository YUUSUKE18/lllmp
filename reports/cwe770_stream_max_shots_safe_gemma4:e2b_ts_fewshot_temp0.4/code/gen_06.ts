import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内かチェック
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できない要素や空要素は無視される。
// 空要素・前後の空白は無視される。
// 整数として解釈できない要素も無視される。
process.stdout.write(`count=${count} max=${maxValue}\n`);
