import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxVal = -Infinity;
let validCount = 0;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェック（文字列が数字のみで構成されているか）
    if (!isNaN(num)) {
        validCount++;
        if (num > maxVal) {
            maxVal = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxVal}\n`);
