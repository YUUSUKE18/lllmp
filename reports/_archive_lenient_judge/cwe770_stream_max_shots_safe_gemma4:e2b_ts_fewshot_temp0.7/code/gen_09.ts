import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
let count = 0;
let maxVal = -Infinity;
let currentNumStr = "";
let isParsingNumber = false;

for (const char of input) {
    if (char >= '0' && char <= '9') {
        currentNumStr += char;
        isParsingNumber = true;
    } else if (char === ',') {
        if (isParsingNumber) {
            const num = parseInt(currentNumStr, 10);
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            currentNumStr = "";
            isParsingNumber = false;
        }
    } else if (char === ' ' || char === '\n' || char === '\r') {
        // 空白や改行は無視
        isParsingNumber = false;
        currentNumStr = "";
    }
}

// 最後の数値を処理
if (isParsingNumber) {
    const num = parseInt(currentNumStr, 10);
    count++;
    if (num > maxVal) {
        maxVal = num;
    }
}

process.stdout.write(`count=${count} max=${maxVal}\n`);
