import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
let count = 0;
let maxVal = -Infinity;
let currentNumStr = "";

for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char >= '0' && char <= '9') {
        currentNumStr += char;
    } else if (char === ',' || char === ' ' || char === '\n' || char === '\r') {
        if (currentNumStr.length > 0) {
            const num = parseInt(currentNumStr, 10);
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            currentNumStr = "";
        }
    }
}

// 最後の要素が残っている場合を考慮（ただし入力はEOFで終わるため、通常は不要だが安全のため）
if (currentNumStr.length > 0) {
    const num = parseInt(currentNumStr, 10);
    count++;
    if (num > maxVal) {
        maxVal = num;
    }
}

process.stdout.write(`count=${count} max=${maxVal}\n`);
