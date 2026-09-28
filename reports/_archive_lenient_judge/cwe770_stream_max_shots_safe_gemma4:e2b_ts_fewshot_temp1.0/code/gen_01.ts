import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

let count = 0;
let maxValue = -Infinity;
let inNumber = false;
let currentNumberStr = "";

for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char >= '0' && char <= '9') {
        currentNumberStr += char;
        inNumber = true;
    } else {
        if (inNumber) {
            const num = parseInt(currentNumberStr, 10);
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            currentNumberStr = "";
            inNumber = false;
        }
    }
}

// 最後の数値を処理
if (inNumber) {
    const num = parseInt(currentNumberStr, 10);
    count++;
    if (num > maxValue) {
        maxValue = num;
    }
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
