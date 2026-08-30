import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

let count = 0;
let maxVal = -Infinity;
let inNumber = false;
let currentNumStr = "";

for (const char of input) {
    if (char >= '0' && char <= '9') {
        currentNumStr += char;
        inNumber = true;
    } else {
        if (inNumber) {
            const num = parseInt(currentNumStr, 10);
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            currentNumStr = "";
            inNumber = false;
        }
    }
}

// 最後の要素の処理
if (inNumber) {
    const num = parseInt(currentNumStr, 10);
    count++;
    if (num > maxVal) {
        maxVal = num;
    }
}

process.stdout.write(`count=${count} max=${maxVal}\n`);
